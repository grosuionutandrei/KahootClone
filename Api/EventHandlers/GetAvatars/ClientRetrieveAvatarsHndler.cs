using Api.WebSockets;
using EFScaffold.querry;
using Fleck;
using MediatR;
using WebSocketBoilerplate;

namespace Api.EventHandlers.GetAvatars;

public class ClientRetrieveAvatarDto : BaseDto
{
    public string gameId { get; set; }
}

public class ServerSendsAvatarList : BaseDto
{
    public List<string> paths { get; set; }
}

public class ClientRetrieveAvatarsHandler(IMediator mediator,IConnectionManager connectionManager):BaseEventHandler<ClientRetrieveAvatarDto>
{
    public override async Task Handle(ClientRetrieveAvatarDto dto, IWebSocketConnection socket)
    {
        var avatarList = await mediator.Send(new Avatars(dto.gameId));
        var response = new ServerSendsAvatarList()
        {
            requestId = dto.requestId,
            paths = avatarList.avatars!
        };
        socket.SendDto(response);
    }
}