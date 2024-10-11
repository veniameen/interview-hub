using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace InterviewHub.Application.CQRS.Notes.Commands.CreateNote
{
    public class CreateNoteCommandHandler : IRequestHandler<CreateNoteCommand, Guid>
    {
        public async Task<Guid> Handle(CreateNoteCommand request, CancellationToken cancellationToken)
        {
          throw new System.NotImplementedException();
        }
    }
}
