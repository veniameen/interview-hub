using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BaseProject.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    public class NoteController(IMapper mapper, IConfiguration configuration) : BaseController
    {
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<int>> GetAll()
        {
            return Ok(1);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<int>> Get(string id)
        {
            var a = configuration.GetSection(id);
            
            return Ok(configuration[id]);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create([FromBody] string createDto)
        {
            return Ok(1);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] string updateDto)
        {
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return NoContent();
        }
    }
}
