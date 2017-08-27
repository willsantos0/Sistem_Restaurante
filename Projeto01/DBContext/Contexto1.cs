namespace Projeto01.DBContext
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Contexto1 : DbContext
    {
        public Contexto1()
            : base("name=Contexto1")
        {
        }

        public virtual DbSet<prato> prato { get; set; }
        public virtual DbSet<restaurante> restaurante { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
       /*     modelBuilder.Entity<prato>()
                .Property(e => e.nome)
                .IsUnicode(false);

            modelBuilder.Entity<restaurante>()
                .Property(e => e.nome)
                .IsUnicode(false);

            modelBuilder.Entity<restaurante>()
                .HasMany(e => e.pratos)
                .WithOptional(e => e.restaurante)
                .HasForeignKey(e => e.restaurantefk); */
        }
    }
}
