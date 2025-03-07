using EFScaffold.Dto;
using MediatR;

namespace EFScaffold.querry;

public record RetrievePlayers(string gameId) : IRequest<List<PlayerInfoDto>>;
