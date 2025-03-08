using Api.EventHandlers.AddPlayer;
using Api.WebSockets;
using EFScaffold.querry;
using Fleck;
using MediatR;
using WebSocketBoilerplate;

namespace Api.EventHandlers.InfoData;

public  class ClientLoadPlayersDto : BaseDto
{
    public string topic { get; set; }
    public string gameId { get; set; }
}

public class ClientLoadPlayers(IConnectionManager connectionManager,IMediator mediator):BaseEventHandler<ClientLoadPlayersDto>
{
    public override async Task Handle(ClientLoadPlayersDto dto, IWebSocketConnection socket)
    {
        var players  = await mediator.Send(new RetrievePlayers(dto.gameId!));
        socket.SendDto(new ServerUpdateJoinPlayersDto() { players = players,requestId = dto.requestId});
    }
}