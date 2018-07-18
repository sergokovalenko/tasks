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
    public class UserDao : IUserDal
    {
        private DBDalConfig config;

        public UserDao(DBDalConfig config)
        {
            this.config = config;
        }

        public bool AddUser(UserDTO user)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[User.AddUser]", connection);

                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", user.Id)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Name", user.Name)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Birthdate", user.BirthDate)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public bool DeleteUser(Guid userId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[User.DeleteUser]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", userId)
                {
                    Direction = ParameterDirection.Input
                });
                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[Users.GetAll]", connection);
                command.CommandType = CommandType.StoredProcedure;
                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return new UserDTO()
                    {
                        Id = (Guid)reader["Id"],
                        Name = (string)reader["Name"],
                        BirthDate = (DateTime)reader["Birthdate"]
                    };
                }
            }
        }

        public UserDTO GetUserById(Guid id)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[User.GetById]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", id)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return new UserDTO()
                    {
                        Id = (Guid)reader["Id"],
                        Name = (string)reader["Name"],
                        BirthDate = (DateTime)reader["Birthdate"]
                    };
                }

                return null;
            }
        }

        public bool UpdateUser(UserDTO updatedUser)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[User.UpdateUser]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", updatedUser.Id)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Name", updatedUser.Name)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Birthdate", updatedUser.BirthDate)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }
    }
}
