using Api.EventHandlers.AdminCreatesGame;
using Api.WebSockets;
using EFScaffold.commands;
using EFScaffold.Dto;
using Fleck;
using MediatR;
using WebSocketBoilerplate;

namespace Api.EventHandlers.AdminCreatesGame;

public class AdminCreatesGameDto:BaseDto{
    public string Name { get; set; } = null!;
}

public class ServerConfirmsGameDto : BaseDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public bool Success { get; set; }
}

public class AdminCreatesGameHandler(IConnectionManager connectionManager)
    : BaseEventHandler<AdminCreatesGameDto>
{

    private IMediator _mediator;

    public AdminCreatesGameHandler(IConnectionManager connectionManager, IMediator mediator) : this(connectionManager)
    {
        _mediator = mediator;
    }

    public async override Task Handle(AdminCreatesGameDto dto, IWebSocketConnection socket)
    {
        var requestBody = new CreateNewGameDto() {Name = dto.Name};
        var request = new CreateGameDto(requestBody);
        var response = await  _mediator.Send(request);
        var requestResponse = new ServerConfirmsGameDto()
        {
            requestId = dto.requestId,
            Id = response.Id,
            Name = response.Name,
            Success = response.Success
        };
        socket.SendDto(requestResponse);
    }
}