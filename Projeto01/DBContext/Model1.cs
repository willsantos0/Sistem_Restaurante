namespace Projeto01.DBContext
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Model1 : DbContext
    {
        public Model1()
            : base("name=ModDados")
        {
        }


        public virtual DbSet<prato> prato { get; set; }
        public virtual DbSet<restaurante> restaurante { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
                 modelBuilder.Entity<prato>()
                     .Property(e => e.nome)
                     .IsUnicode(false);

                 modelBuilder.Entity<restaurante>()
                     .Property(e => e.nome)
                     .IsUnicode(false);

                 modelBuilder.Entity<restaurante>()
                     .HasMany(e => e.pratos)
                     .WithOptional(e => e.restaurante)
                     .HasForeignKey(e => e.restaurantefk);

            modelBuilder.Entity<restaurante>()
            .HasMany<prato>(c => c.pratos)
            .WithOptional(x => x.restaurante)
            .WillCascadeOnDelete(true);

        }
    }
}
