using AutoMapper;

namespace InterviewHub.Application.Common.Mappings
{
    public interface IMapWith<T>
    {
        void Mapping (Profile  profile) => profile.CreateMap(typeof(T), GetType());
    }
}
