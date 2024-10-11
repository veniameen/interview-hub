using AutoMapper;
using BaseProject.API.Requests;
using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BaseProject.API.Controllers
{
    //[Authorize]
    [Route("api/candidates")]
    public class CandidateController(IMapper mapper, IConfiguration configuration, ICandidateService service)
        : BaseController
    {
        private readonly IMapper _mapper = mapper;

        [HttpPost]
        public async Task<ActionResult<Candidate>> Create([FromBody] CreateCandidateRequest request)
        {
            var candidate =
                await service.CreateAsync(request.Name, request.Email, request.Description, request.ResumeUrl, request.Status);
            return Ok(candidate);
        }

        [HttpPut]
        public async Task<ActionResult<Candidate>> Update([FromBody] UpdateCandidateRequest request)
        {
            var candidate = await service.UpdateAsync(request.Id, request.Name, request.Email, request.Description,
                request.ResumeUrl, request.Status);

            if (candidate == null)
                return NotFound(request.Id);
            return Ok(candidate);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Candidate>> Get(int id)
        {
            var candidate = await service.GetAsync(id);

            if (candidate == null)
                return NotFound(id);
            return Ok(candidate);
        }

        [HttpGet]
        public async Task<ActionResult<List<Candidate>>> GetAll()
        {
            var candidates = await service.GetListAsync();
            return Ok(candidates);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await service.DeleteAsync(id);
            return Ok();
        }
    }
    
    //[Authorize]
}