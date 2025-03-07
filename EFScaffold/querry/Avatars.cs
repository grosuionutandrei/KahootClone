using EFScaffold.Dto;
using MediatR;

namespace EFScaffold.querry;

public record Avatars(string GameId):IRequest<AvatarsDto>;