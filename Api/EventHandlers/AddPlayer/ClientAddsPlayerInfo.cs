using Api.EventHandlers.Dtos;
using Api.WebSockets;
using EFScaffold.Dto;
using EFScaffold.querry;
using Fleck;
using MediatR;
using WebSocketBoilerplate;

namespace Api.EventHandlers.AddPlayer;


public class ClientAddsPlayerInfoDto : BaseDto
{
    public string Id { get; set; } = null!;
    public string? GameId { get; set; }
    public string Nickname { get; set; } = null!;
    public string AvatarId { get; set; } = null!;
}

public class ServerUpdatePlayersDto : BaseDto
    {
        public int players { get; set; }
        public List<string> avatars { get; set; }
    }

public class ServerUpdateJoinPlayersDto : BaseDto
{
    public List<PlayerInfoDto> players { get; set; }
}

    public class ClientAddsPlayerInfoEventHandler
        : BaseEventHandler<ClientAddsPlayerInfoDto>
    {
        private IMediator _mediator;
        private IConnectionManager _connectionManager;

        public ClientAddsPlayerInfoEventHandler(IMediator mediator,IConnectionManager connectionManager)
        {
            _mediator = mediator;
            _connectionManager = connectionManager;
        }

        public override async Task Handle(ClientAddsPlayerInfoDto dto,
            IWebSocketConnection socket)
        {
            var playerInfo = new PlayerInfoDto()
            {
               Id = dto.Id,
               AvatarId = dto.AvatarId,
               GameId = dto.GameId,
               Nickname = dto.Nickname
            };
           var res = await _mediator.Send( new EFScaffold.commands.AddPlayer(playerInfo));
           if (res)
           {
               await _connectionManager.AddToTopic("lobby",dto.Id);
               var avatars = await _mediator.Send(new Avatars(dto.GameId!));
               var players = await _connectionManager.GetMembersFromTopicId("lobby");
               await _connectionManager.BroadcastToTopic("lobby", new ServerUpdatePlayersDto()  {players  = players.Count,avatars=avatars.avatars!});
               var playersInfo = await _mediator.Send(new RetrievePlayers(dto.GameId!));
               await _connectionManager.BroadcastToTopic("lobby", new ServerUpdateJoinPlayersDto() { players = playersInfo,requestId = dto.requestId});
           }
           var confirmationToClient = new ServerConfirmsDto()
            {
                requestId = dto.requestId,
                Success = res
            };
            socket.SendDto(confirmationToClient);
        }
    }
