using System.Collections.Generic;
using UsersAward.Entities;

namespace UsersAward.BLL.AbstractBLL
{
    public interface IAwardLogic
    {
        IEnumerable<AwardDTO> GetAwardsByFirstLetter(char letter);

        IEnumerable<AwardDTO> GetAwardsContains(string text);

        IEnumerable<AwardDTO> GetAllAwards();

        AwardDTO GetAwardById(int id);

        AwardDTO GetAwardByName(string name);

        bool DeleteAward(int awardId);

        int AddAward(AwardDTO award);

        bool UpdateAward(AwardDTO updatedAward);

        IEnumerable<AwardDTO> GetAwardsForUser(int userId);

        IEnumerable<AwardDTO> GetFreeAwardsForUser(int userId);
    }
}