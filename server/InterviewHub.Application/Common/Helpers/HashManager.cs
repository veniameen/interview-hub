using System.Security.Cryptography;

namespace InterviewHub.Application.Common.Helpers;

public class HashManager
{
    private const int Iterations = 10000; // Количество итераций
    private const int SaltSize = 16; // Размер соли в байтах
    private const int HashSize = 32; // Размер хэша в байтах

    // Хэширование пароля
    public static string HashPassword(string password)
    {
        var salt = new byte[SaltSize];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        using (var hmac = new HMACSHA256())
        {
            var hash = new byte[HashSize];
            for (int i = 0; i < Iterations; i++)
            {
                hmac.Key = salt;
                hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password + Convert.ToBase64String(hash)));
            }

            var saltBase64 = Convert.ToBase64String(salt);
            var hashBase64 = Convert.ToBase64String(hash);
            return $"{Iterations}:{saltBase64}:{hashBase64}";
        }
    }

    // Сравнение пароля
    public static bool VerifyPassword(string password, string hashedPassword)
    {
        var parts = hashedPassword.Split(':');
        var iterations = int.Parse(parts[0]);
        var salt = Convert.FromBase64String(parts[1]);
        var hash = Convert.FromBase64String(parts[2]);

        using (var hmac = new HMACSHA256())
        {
            var newHash = new byte[HashSize];
            for (int i = 0; i < iterations; i++)
            {
                hmac.Key = salt;
                newHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password + Convert.ToBase64String(newHash)));
            }

            return CryptographicOperations.FixedTimeEquals(hash, newHash);
        }
    }
}