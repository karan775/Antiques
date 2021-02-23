using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using Antiques.Data;
using Antiques.Models;

namespace Antiques.Controllers
{
    public class AntiquesController : ApiController
    {
        private AntiquesContext db = new AntiquesContext();


        // GET: api/Antiques
        public IQueryable<Antique> GetAntiques()
        {
            return db.Antiques;
        }

        // GET: api/Antiques/5
        [ResponseType(typeof(Antique))]
        public IHttpActionResult GetAntique(int id)
        {
            Antique antique = db.Antiques.Find(id);
            if (antique == null)
            {
                return NotFound();
            }

            return Ok(antique);
        }

        // PUT: api/Antiques/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAntique(int id, Antique antique)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != antique.Id)
            {
                return BadRequest();
            }

            db.Entry(antique).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AntiqueExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Antiques
        [ResponseType(typeof(Antique))]
        public IHttpActionResult PostAntique(Antique antique)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Antiques.Add(antique);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = antique.Id }, antique);
        }

        // DELETE: api/Antiques/5
        [ResponseType(typeof(Antique))]
        public IHttpActionResult DeleteAntique(int id)
        {
            Antique antique = db.Antiques.Find(id);
            if (antique == null)
            {
                return NotFound();
            }

            db.Antiques.Remove(antique);
            db.SaveChanges();

            return Ok(antique);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AntiqueExists(int id)
        {
            return db.Antiques.Count(e => e.Id == id) > 0;
        }
    }
}