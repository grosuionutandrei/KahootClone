using EFScaffold.commands;
using EFScaffold.Dto;
using EFScaffold.Repos;
using MediatR;

namespace EFScaffold.Handlers;

public class CreateNewGameHandler:IRequestHandler<CreateGameDto,GameCreatedDto>
{
    private IUserRepository userRepository;


    public CreateNewGameHandler(IUserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public async  Task<GameCreatedDto> Handle(CreateGameDto request, CancellationToken cancellationToken)
    {
        var id = Guid.NewGuid();
        var response = await userRepository.CreateGAme(id,request.NewGame.Name);
        return response;

    }
}