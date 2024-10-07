using AutoMapper;
using InterviewHub.Application.Common.Mappings;

namespace BaseProject.API.Models
{
    public class CreateDto : IMapWith<string>
    {
        public string? Title { get; set; }
        
        public string? Details { get; set; }

        public void Mapping(Profile profile)
        {
            //profile.CreateMap<CreateDto, string>().ForMember(noteCommand => noteCommand, opt => opt.MapFrom(noteDto => noteDto.Title));
        }
    }
}
