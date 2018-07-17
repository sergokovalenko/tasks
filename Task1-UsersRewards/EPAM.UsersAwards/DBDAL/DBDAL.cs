using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
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
                SqlCommand command = new SqlCommand("[dbo].[Award.AddAward]", connection);

                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", award.Id)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Title", award.Title)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Description", award.Description)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public bool AddUser(UserDTO user)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
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

        public bool DeleteAward(Guid awardId)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Award.DeleteAward]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", awardId)
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
            using (SqlConnection connection = new SqlConnection(connectionString))
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

        public IEnumerable<AwardDTO> GetAllAwards()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Awards.GetAll]", connection);
                command.CommandType = CommandType.StoredProcedure;
                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return new AwardDTO()
                    {
                        Id = (Guid)reader["Id"],
                        Title = (string)reader["Title"],
                        Description = (string)reader["Description"]
                    };
                }
            }
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
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

        public AwardDTO GetAwardById(Guid id)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Award.GetById]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", id)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return new AwardDTO()
                    {
                        Id = (Guid)reader["Id"],
                        Title = (string)reader["Title"],
                        Description = (string)reader["Description"]
                    };
                }

                return null;
            }
        }

        public UserDTO GetUserById(Guid id)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
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

        public ImageDTO GetImageById(Guid id)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Image.GetById]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", id)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return new ImageDTO()
                    {
                        OwnerId = (Guid)reader["OwnerId"],
                        Data = (byte[])reader["Bytes"],
                        Type = (string)reader["Type"]
                    };
                }

                return null;
            }
        }

        public bool UpdateAward(AwardDTO updatedAward)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Award.UpdateAward]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", updatedAward.Id)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Title", updatedAward.Title)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Description", updatedAward.Description)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public bool UpdateUser(UserDTO updatedUser)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
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

        public bool AddImage(ImageDTO img)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Image.AddImage]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@OwnerId", img.OwnerId)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Bytes", img.Data)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@DataType", img.Type)
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
