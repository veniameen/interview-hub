using System;

namespace InterviewHub.Application.Common.Exceptions
{
    public class NotFoundException(string name, object key) : Exception($"Entity \"{name}\" ({key}) not found");
    
    public class UserExistException(string name) : Exception($"User \"{name}\" exist");
}