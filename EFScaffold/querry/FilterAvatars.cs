using MediatR;

namespace EFScaffold.querry;

public record FilterAvatars():IRequest<List<string>>;