using DBDAL;
using System.Collections.Generic;
using System.Data.SqlClient;
using UsersAward.DAL.AbstractDAL;
using UsersAward.Entities;

namespace UsersAward.Dal.DBDAL
{
    public class UserDao : IUserDal
    {
        private DBDalConfig config;
        private ConnectionHelper helper;

        public UserDao(DBDalConfig config, ConnectionHelper con)
        {
            this.config = config;
            this.helper = con;
        }

        public int AddUser(UserDTO user)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[dbo].[User.AddUser]",
                    connection,
                    new string[] { "@Name", "@Birthdate", "@ImageId" },
                    new object[] { user.Name, user.BirthDate, user.ImageId }
                    );

                connection.Open();
                int id = (int)(decimal)command.ExecuteScalar();

                return id;
            }
        }

        public bool DeleteUser(int userId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[dbo].[User.DeleteUser]",
                    connection,
                    new string[] { "@Id" },
                    new object[] { userId }
                    );

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand("[Users.GetAll]", connection);

                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return helper.ReadUser(reader);
                }
            }
        }

        public UserDTO GetUserById(int id)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[User.GetById]",
                    connection,
                    new string[] { "@Id" },
                    new object[] { id }
                    );

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return helper.ReadUser(reader);
                }

                return null;
            }
        }

        public bool UpdateUser(UserDTO updatedUser)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[User.UpdateUser]",
                    connection,
                    new string[] { "@Id", "@Name", "@Birthdate", "@ImageId" },
                    new object[] { updatedUser.Id, updatedUser.Name, updatedUser.BirthDate, updatedUser.ImageId }
                    );

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public bool AddAwardToUser(int userId, int awardId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[UsersAwards.AddAwardToUser]",
                    connection,
                    new string[] { "@UserId", "@AwardId" },
                    new object[] { userId, awardId }
                    );

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public UserDTO GetOldestUserByName(string name)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[dbo].[User.GetByName]",
                    connection,
                    new string[] { "@name" },
                    new object[] { name }
                    );

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return helper.ReadUser(reader);
                }

                return null;
            }
        }

        public IEnumerable<UserDTO> GetUsersByFirstLetter(char letter)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[dbo].[User.GetAllWithFirstLetter]",
                    connection,
                    new string[] { "@symbol" },
                    new object[] { letter }
                    );

                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return helper.ReadUser(reader);
                }
            }
        }

        public IEnumerable<UserDTO> GetUsersContains(string text)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[dbo].[User.GetAllWithText]",
                    connection,
                    new string[] { "@text" },
                    new object[] { text }
                    );

                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return helper.ReadUser(reader);
                }
            }
        }

        public bool UserHasAward(int userId, int awardId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[dbo].[UsersAwards.UserHasAward]",
                    connection,
                    new string[] { "@UserId", "@AwardId" },
                    new object[] { userId, awardId }
                    );

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    if ((int)reader["UserId"] > 0)
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}