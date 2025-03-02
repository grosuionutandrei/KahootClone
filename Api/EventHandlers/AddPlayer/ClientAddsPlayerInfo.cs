using Api.EventHandlers.Dtos;
using Api.WebSockets;
using EFScaffold.Dto;
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

public class ServerPutsPlayerInGameAndBroadcastToAll : BaseDto
    {
        public string AvatarId { get; set; } = null!;
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
               await _connectionManager.BroadcastToTopic("lobby", new ServerPutsPlayerInGameAndBroadcastToAll { AvatarId=dto.AvatarId });
           }
           var confirmationToClient = new ServerConfirmsDto()
            {
                requestId = dto.requestId,
                Success = res
            };
            socket.SendDto(confirmationToClient);
        }
    }
