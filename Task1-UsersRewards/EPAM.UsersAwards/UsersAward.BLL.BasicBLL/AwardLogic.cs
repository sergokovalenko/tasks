using System;
using System.Collections.Generic;
using System.Linq;
using UsersAward.BLL.AbstractBLL;
using UsersAward.DAL.AbstractDAL;
using UsersAward.Entities;

namespace UsersAward.BLL.BasicBLL
{
    public class AwardLogic : IAwardLogic
    {
        private IAwardDal dal;

        public AwardLogic(IAwardDal dal)
        {
            this.dal = dal;
        }

        public int AddAward(AwardDTO award)
        {
            if (award == null || string.IsNullOrWhiteSpace(award.Title) || award.Title.Length > ModelRules.MaxNameLength)
            {
                return ModelRules.LowerBoundOfId - 1;
            }

            if (string.IsNullOrWhiteSpace(award.Description))
            {
                award.Description = string.Empty;
            }

            award.Id = ModelRules.LowerBoundOfId - 1;

            return dal.AddAward(award);
        }

        public bool DeleteAward(int awardId)
        {
            if (awardId < ModelRules.LowerBoundOfId)
            {
                return false;
            }

            return dal.DeleteAward(awardId);
        }

        public IEnumerable<AwardDTO> GetAllAwards()
        {
            return dal.GetAllAwards().ToArray();
        }

        public AwardDTO GetAwardById(int id)
        {
            if (id < ModelRules.LowerBoundOfId)
            {
                return null;
            }

            return dal.GetAwardById(id);
        }

        public IEnumerable<AwardDTO> GetAwardsForUser(int userId)
        {
            return dal.GetAwardsForUser(userId).ToArray();
        }

        public IEnumerable<AwardDTO> GetFreeAwardsForUser(int userId)
        {
            if (userId <= ModelRules.LowerBoundOfId)
            {
                return null;
            }

            return dal.GetFreeAwardsForUser(userId).ToArray();
        }

        public bool UpdateAward(AwardDTO updatedAward)
        {
            if (updatedAward == null || string.IsNullOrWhiteSpace(updatedAward.Title))
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(updatedAward.Description))
            {
                updatedAward.Description = string.Empty;
            }

            if (updatedAward.Description.Length > ModelRules.MaxDescriptionLength)
            {
                return false;
            }

            return dal.UpdateAward(updatedAward);
        }

        public IEnumerable<AwardDTO> GetAwardsByFirstLetter(char letter)
        {
            if (char.IsSeparator(letter))
            {
                return null;
            }

            return dal.GetAwardsByFirstLetter(letter).ToList();
        }

        public IEnumerable<AwardDTO> GetAwardsContains(string text)
        {
            text = ValidateText(text);
            if (string.IsNullOrWhiteSpace(text))
            {
                return null;
            }

            return dal.GetAwardsContains(text).ToList();
        }

        public AwardDTO GetAwardByName(string name)
        {
            name = ValidateText(name);
            if (string.IsNullOrWhiteSpace(name))
            {
                return null;
            }

            return dal.GetAwardByName(name);
        }

        private string ValidateText(string text)
        {
            if (string.IsNullOrWhiteSpace(text) || text.Length > ModelRules.MaxNameLength)
            {
                return null;
            }

            return text.Trim();
        }
    }
}