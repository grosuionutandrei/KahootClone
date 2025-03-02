using EFScaffold;
using EFScaffold.commands;
using EFScaffold.Repos;

public class UserRepository : IUserRepository
{
    public UserRepository(KahootContext dbContext)
    {
        this.dbContext = dbContext;
    }

    private KahootContext dbContext;
    public async Task<bool> SaveOrUpdate(AddPlayer request)
    {


        return true;
    }
}