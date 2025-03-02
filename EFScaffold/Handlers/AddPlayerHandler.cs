using EFScaffold.commands;
using EFScaffold.Repos;
using MediatR;

namespace EFScaffold.Handlers;

public class AddPlayerHandler:IRequestHandler<AddPlayer,bool>
{
    private IUserRepository userRepository;

    public AddPlayerHandler(IUserRepository userRepository)
    {
        this.userRepository = userRepository;
    }
    public async Task<bool> Handle(AddPlayer request, CancellationToken cancellationToken)
    {
        return await userRepository.SaveOrUpdate(request);
    }
}