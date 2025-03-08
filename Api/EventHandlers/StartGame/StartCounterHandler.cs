using Api.WebSockets;
using Fleck;
using WebSocketBoilerplate;

namespace Api.EventHandlers.StartGame;


public class ClientStartsCounter : BaseDto
{
}

public class CounterBroadcast : BaseDto
{
    public bool startCounter { get; set; }
}




public class StartCounterHandler(IConnectionManager _connectionManager):BaseEventHandler<ClientStartsCounter>
{
    public override async Task Handle(ClientStartsCounter dto, IWebSocketConnection socket)
    {
       await  _connectionManager.BroadcastToTopic("lobby", new CounterBroadcast() { startCounter = true });
       socket.SendDto(new CounterBroadcast(){startCounter = true,requestId = dto.requestId});
    }
}