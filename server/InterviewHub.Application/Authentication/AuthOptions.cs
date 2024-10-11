using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace BaseProject.API.Authentication;

public class AuthOptions
{
    public const string Issuer = "InterviewHub";
    public const string Audience = "ReactApp";
    private const string Key = "mysupersecret_secretkey!123InterviewHub";
    public const int Lifetime = 1;

    public static SymmetricSecurityKey GetSymmetricSecurityKey()
    {
        return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
    }
}