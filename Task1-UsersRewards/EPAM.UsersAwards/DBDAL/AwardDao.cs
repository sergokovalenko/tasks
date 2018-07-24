using DBDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.DAL.AbstractDAL;
using UsersAward.Entities;

namespace UsersAward.Dal.DBDAL
{
    public class AwardDao : IAwardDal
    {
        private DBDalConfig config;
        private ConnectionHelper helper;

        public AwardDao(DBDalConfig config, ConnectionHelper con)
        {
            this.config = config;
            this.helper = con;
        }

        public int AddAward(AwardDTO award)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[dbo].[Award.AddAward]",
                    connection,
                    new string[] { "@Title", "@Description", "@ImageId" },
                    new object[] { award.Title, award.Description, award.ImageId }
                    );

                connection.Open();
                int id = (int)(decimal)command.ExecuteScalar();

                return id;
            }
        }

        public bool DeleteAward(int awardId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                   "[dbo].[Award.DeleteAward]",
                   connection,
                   new string[] { "@Id" },
                   new object[] { awardId }
                   );

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public IEnumerable<AwardDTO> GetAllAwards()
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand("[dbo].[Awards.GetAll]", connection);
                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return helper.ReadAward(reader);
                }
            }
        }

        public AwardDTO GetAwardById(int id)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                  "[dbo].[Award.GetById]",
                  connection,
                  new string[] { "@Id" },
                  new object[] { id }
                  );

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return helper.ReadAward(reader);
                }

                return null;
            }
        }

        public bool UpdateAward(AwardDTO updatedAward)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                   "[dbo].[Award.UpdateAward]",
                   connection,
                   new string[] { "@Id", "@Title", "@Description", "@ImageId" },
                   new object[] { updatedAward.Id, updatedAward.Title, updatedAward.Description, updatedAward.ImageId }
                   );

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public IEnumerable<AwardDTO> GetAwardsForUser(int userId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                  "[dbo].[UsersAwards.GetUserAwards]",
                  connection,
                  new string[] { "@UserId" },
                  new object[] { userId }
                  );

                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return helper.ReadAward(reader);
                }
            }
        }

        public IEnumerable<AwardDTO> GetFreeAwardsForUser(int userId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                 "[dbo].[UsersAwards.GetFreeUserAwards]",
                  connection,
                  new string[] { "@UserId" },
                  new object[] { userId }
                  );
 
                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return helper.ReadAward(reader);
                }
            }
        }

        public AwardDTO GetAwardByName(string name)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                 "[dbo].[UsersAwards.GetFreeUserAwards]",
                  connection,
                  new string[] { "@title" },
                  new object[] { name }
                  );

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return helper.ReadAward(reader);
                }

                return null;
            }
        }

        public IEnumerable<AwardDTO> GetAwardsByFirstLetter(char letter)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                 "[dbo].[Award.GetAllWithFirstLetter]",
                  connection,
                  new string[] { "@symbol" },
                  new object[] { letter }
                  );

                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return helper.ReadAward(reader);
                }
            }
        }

        public IEnumerable<AwardDTO> GetAwardsContains(string text)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                 "[dbo].[Award.GetAllWithText]",
                  connection,
                  new string[] { "@text" },
                  new object[] { text }
                  );

                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return helper.ReadAward(reader);
                }
            }
        }
    }
}
