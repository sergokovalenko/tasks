using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.DAL.AbstractDAL;
using UsersAward.Entities;

namespace UsersAward.DAL.DBDAL
{
    public class DBDAL : IAbstractDAL
    {
        private static string connectionString;

        public DBDAL()
        {
            connectionString = ConfigurationManager.ConnectionStrings["UsersAwardsDB"].ConnectionString;
        }

        public bool AddAward(AwardDTO award)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("INSERT INTO Award (Id, Title, Description) VALUES(@Id,@Title,@Description)", connection);

                command.Parameters.AddWithValue("@Id", award.Id);
                command.Parameters.AddWithValue("@Title", award.Title);
                command.Parameters.AddWithValue("@Description", award.Description);
                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow == 1;
            }
        }

        public bool AddUser(UserDTO user)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("INSERT INTO User (Id, Name, Birthdate) VALUES(@Id,@Name,@Birthdate)", connection);

                command.Parameters.AddWithValue("@Id", user.Id);
                command.Parameters.AddWithValue("@Name", user.Name);
                command.Parameters.AddWithValue("@Birthdate", user.BirthDate);
                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow == 1;
            }
        }

        public bool DeleteAward(int awardId)
        {
            throw new NotImplementedException();
        }

        public bool DeleteUser(int userId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<AwardDTO> GetAllAwards()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public bool UpdateAward(AwardDTO updatedAward)
        {
            throw new NotImplementedException();
        }

        public bool UpdateUser(UserDTO updatedUser)
        {
            throw new NotImplementedException();
        }
    }
}
