using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngulerWebApp.Models;

namespace AngulerWebApp.Controllers
{
    [RoutePrefix("Api/Employee")]
    public class AngulerWebAppController : ApiController
    {
        AngulerDBEntities objEntity = new AngulerDBEntities();

        [HttpGet]
        [Route("AllEmployeeDetails")]
        public IHttpActionResult GetEmaployee()
        {
            try
            {
                var result = (from tblEmp in objEntity.tblEmployeeMasters
                              join tblCountry in objEntity.CountryMasters on tblEmp.CountryId equals tblCountry.CountryId
                              join tblState in objEntity.StateMasters on tblEmp.StateId equals tblState.StateId
                              join tblCity in objEntity.CityMasters on tblEmp.Cityid equals tblCity.Cityid
                              select new
                              {
                                  EmpId = tblEmp.EmpId,
                                  FirstName = tblEmp.FirstName,
                                  LastName = tblEmp.LastName,
                                  DateofBirth = tblEmp.DateofBirth,
                                  EmailId = tblEmp.EmailId,
                                  Gender = tblEmp.Gender,
                                  CountryId = tblEmp.CountryId,
                                  StateId = tblEmp.StateId,
                                  Cityid = tblEmp.Cityid,
                                  Address = tblEmp.Address,
                                  Pincode = tblEmp.Pincode,
                                  Country = tblCountry.CountryName,
                                  State = tblState.StateName,
                                  City = tblCity.CityName
                              }).ToList();

                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetEmployeeDetailsById/{employeeId}")]
        public IHttpActionResult GetEmaployeeById(string employeeId)
        {
            try
            {
                tblEmployeeMaster objEmp = new tblEmployeeMaster();
                int ID = Convert.ToInt32(employeeId);
                try
                {
                    objEmp = objEntity.tblEmployeeMasters.Find(ID);
                    if (objEmp == null)
                    {
                        return NotFound();
                    }
                }
                catch (Exception)
                {
                    throw;
                }
                return Ok(objEmp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("InsertEmployeeDetails")]
        public IHttpActionResult PostEmaployee(tblEmployeeMaster data)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                try
                {
                    data.DateofBirth = data.DateofBirth.HasValue ? data.DateofBirth.Value.AddDays(1) : (DateTime?)null;
                    objEntity.tblEmployeeMasters.Add(data);
                    objEntity.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut]
        [Route("UpdateEmployeeDetails")]
        public IHttpActionResult PutEmaployeeMaster(tblEmployeeMaster employee)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                try
                {
                    tblEmployeeMaster objEmp = new tblEmployeeMaster();
                    objEmp = objEntity.tblEmployeeMasters.Find(employee.EmpId);
                    if (objEmp != null)
                    {
                        objEmp.FirstName = employee.FirstName;
                        objEmp.LastName = employee.LastName;
                        objEmp.Address = employee.Address;
                        objEmp.EmailId = employee.EmailId;
                        objEmp.DateofBirth = employee.DateofBirth.HasValue ? employee.DateofBirth.Value.AddDays(1) : (DateTime?)null;
                        objEmp.Gender = employee.Gender;
                        objEmp.CountryId = employee.CountryId;
                        objEmp.StateId = employee.StateId;
                        objEmp.Cityid = employee.Cityid;
                        objEmp.Pincode = employee.Pincode;
                    }
                    this.objEntity.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
                return Ok(employee);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpDelete]
        [Route("DeleteEmployeeDetails")]
        public IHttpActionResult DeleteEmaployeeDelete(int id)
        {
            try
            {
                tblEmployeeMaster emaployee = objEntity.tblEmployeeMasters.Find(id);
                if (emaployee == null)
                {
                    return NotFound();
                }
                objEntity.tblEmployeeMasters.Remove(emaployee);
                objEntity.SaveChanges();
                return Ok(emaployee);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpGet]
        [Route("Country")]
        public IQueryable<CountryMaster> GetCountry()
        {
            try
            {
                return objEntity.CountryMasters;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<CountryMaster> CountryData()
        {
            try
            {
                return objEntity.CountryMasters.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("Country/{CountryId}/State")]
        [HttpGet]
        public List<StateMaster> StateData(int CountryId)
        {
            try
            {
                return objEntity.StateMasters.Where(s => s.CountryId == CountryId).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [Route("State/{StateId}/City")]
        [HttpGet]
        public List<CityMaster> CityData(int StateId)
        {
            try
            {
                return objEntity.CityMasters.Where(s => s.StateId == StateId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("DeleteRecord")]
        public IHttpActionResult DeleteRecord(List<tblEmployeeMaster> user)
        {
            string result = "";
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                result = DeleteData(user);
            }
            catch (Exception ex)
            {
                throw;
            }
            return Ok(result);
        }
        private string DeleteData(List<tblEmployeeMaster> users)
        {
            string str = "";
            try
            {
                foreach (var item in users)
                {
                    tblEmployeeMaster objEmp = new tblEmployeeMaster();
                    objEmp.EmpId = item.EmpId;
                    objEmp.FirstName = item.FirstName;
                    objEmp.LastName = item.LastName;
                    objEmp.Address = item.Address;
                    objEmp.EmailId = item.EmailId;
                    objEmp.DateofBirth = item.DateofBirth.HasValue ? item.DateofBirth.Value.AddDays(1) : (DateTime?)null;
                    objEmp.Gender = item.Gender;
                    objEmp.CountryId = item.CountryId;
                    objEmp.StateId = item.StateId;
                    objEmp.Cityid = item.Cityid;
                    objEmp.Pincode = item.Pincode;
                    var entry = objEntity.Entry(objEmp);
                    if (entry.State == EntityState.Detached) objEntity.tblEmployeeMasters.Attach(objEmp);
                    objEntity.tblEmployeeMasters.Remove(objEmp);
                }
                int i = objEntity.SaveChanges();
                if (i > 0)
                {
                    str = "Records has been deleted";
                }
                else
                {
                    str = "Records deletion has been faild";
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return str;
        }
    }
}
