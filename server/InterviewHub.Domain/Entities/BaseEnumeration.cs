using System.Reflection;

namespace InterviewHub.Domain.Entities;

public abstract class BaseEnumeration(int id, string name) : Enumeration(id, name)
{
    #region Methods

    protected static List<T> List<T>() where T : BaseEnumeration =>
        typeof(T)
            .GetFields(BindingFlags.Static | BindingFlags.Public)
            .Select(s => (T)s.GetValue(null))
            .ToList();

    protected static T FromId<T>(int id) where T : BaseEnumeration
    {
        var list = List<T>();

        var value = list
            .FirstOrDefault(s => s.Id == id);

        if (value != null)
            return value;

        var possibleValues = string.Join(", ", list.Select(s => $"[{s.Id}] {s.Name}"));
        throw new Exception($"Возможные значения для {typeof(T).Name}: {possibleValues}.");
    }

    protected static T FromName<T>(string name) where T : BaseEnumeration =>
        FromStringProperty<T>(nameof(Name), name);

    protected static T FromStringProperty<T>(string propertyName, string propertyValue) where T : BaseEnumeration
    {
        var propertyInfo = typeof(T).GetProperty(propertyName);
        if (propertyInfo == null)
            throw new Exception($"В типе {typeof(T).Name} не найдено свойство {propertyName}.");

        var list = List<T>();

        var value = list
            .FirstOrDefault(s =>
                string.Equals
                (
                    propertyInfo.GetValue(s) as string,
                    propertyValue,
                    StringComparison.CurrentCultureIgnoreCase
                )
            );

        if (value != null)
            return value;

        var possibleValues = string.Join(", ", list.Select(s => $"[{s.Id}] {propertyInfo.GetValue(s)}"));
        throw new Exception($"Возможные значения для {typeof(T).Name}: {possibleValues}.");
    }

    #endregion Methods
}