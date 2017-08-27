using Projeto01.DBContext;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Projeto01.Controllers
{
    public class PratoAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(modelo.prato.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]prato prato)
        {
            modelo.prato.Add(prato);
          return ToJson(modelo.SaveChanges());
        }

        public HttpResponseMessage Put(long id, [FromBody]prato prato)
        {
            modelo.Entry(prato).State = EntityState.Modified;
            return ToJson(modelo.SaveChanges());
        }
        public HttpResponseMessage Delete(long id)
        {
            modelo.prato.Remove(modelo.prato.FirstOrDefault(x => x.id == id));
            return ToJson(modelo.SaveChanges());
        }
    }
}