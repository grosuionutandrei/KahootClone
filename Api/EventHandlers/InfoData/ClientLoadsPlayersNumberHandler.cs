using Api.EventHandlers.AddPlayer;
using Api.WebSockets;
using Fleck;
using WebSocketBoilerplate;

namespace Api.EventHandlers.ClientLoadsPlayersNumer;


public class ClientLoadsPlayersNumberDto : BaseDto
{
    public string topic { get; set; }
}

public class ServersendsInitialPlayers()
{
    public int players { get; set; }
    
}


public class ClientLoadsPlayersNumberHandler(IConnectionManager connectionManager):BaseEventHandler<ClientLoadsPlayersNumberDto>
{
    public override  async Task Handle(ClientLoadsPlayersNumberDto dto, IWebSocketConnection socket)
    {
        var allClients = await connectionManager.GetMembersFromTopicId(dto.topic);
       
        socket.SendDto(new ServerUpdatePlayersDto(){players = allClients.Count});

    }
}