using EFScaffold.commands;

namespace EFScaffold.Repos;

public interface IUserRepository
{
    Task<bool> SaveOrUpdate(AddPlayer request);
}