using EFScaffold.Dto;
using MediatR;

namespace EFScaffold.commands;

public record CreateGameDto(CreateNewGameDto NewGame):IRequest<GameCreatedDto>;