namespace InterviewHub.Domain.Entities;

public abstract class Enumeration(int id, string name) : IComparable
{
    #region Constructors

    #endregion Constructors

    #region Properties

    public int Id { get; protected set; } = id;

    public string Name { get; protected set; } = name;

    #endregion Properties

    #region Methods

    public override string ToString() => Name;

    public override bool Equals(object obj)
    {
        if (obj is not Enumeration otherValue)
        {
            return false;
        }

        var typeMatches = GetType() == obj.GetType();
        var valueMatches = Id.Equals(otherValue.Id);

        return typeMatches && valueMatches;
    }

    public override int GetHashCode() => Id.GetHashCode();

    public int CompareTo(object other) => Id.CompareTo(((Enumeration)other).Id);

    #endregion Methods
}