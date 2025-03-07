using EFScaffold.Dto;

using MediatR;

namespace EFScaffold.commands;

public record AddPlayer(PlayerInfoDto Player) : IRequest<bool>;