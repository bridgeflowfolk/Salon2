module.exports = function (eleventyConfig) {

  // ── Assets statiques ─────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Copie src/static/* → racine _site/
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Sveltia CMS (collection files) résout media_folder relativement
  // au fichier édité (src/_data/galerie.json) même avec un slash initial.
  // Les photos uploadées atterrissent donc dans :
  //   src/_data/src/static/photos/
  // public_folder étant "/Salon2/photos", l'URL stockée dans le JSON est :
  //   /Salon2/photos/<fichier>
  // → 11ty doit copier ce dossier vers _site/photos/ pour que l'URL soit valide.
  eleventyConfig.addPassthroughCopy({ "src/_data/src/static/photos": "photos" });

  // ── Filtre : lien actif dans la nav ──────────────────────────
  eleventyConfig.addFilter("isActive", (navUrl, pageUrl) => {
    return pageUrl === navUrl || pageUrl.startsWith(navUrl + "/");
  });

  // ── Filtre : formatage de date pour blog ─────────────────────
  eleventyConfig.addFilter("date", (value, format) => {
    const d = new Date(value);
    if (isNaN(d)) return value;
    const mois = ["janvier","février","mars","avril","mai","juin",
                  "juillet","août","septembre","octobre","novembre","décembre"];
    const moisC = ["jan.","fév.","mars","avr.","mai","juin",
                   "juil.","août","sept.","oct.","nov.","déc."];
    const j = String(d.getDate()).padStart(2,"0");
    const m = d.getMonth();
    const a = d.getFullYear();
    switch(format) {
      case "DD MMMM YYYY": return j+" "+mois[m]+" "+a;
      case "DD MMM YYYY":  return j+" "+moisC[m]+" "+a;
      case "YYYY-MM-DD":   return a+"-"+String(m+1).padStart(2,"0")+"-"+j;
      default:             return j+" "+mois[m]+" "+a;
    }
  });

  return {
    pathPrefix: "/Salon2/",
    dir: { input:"src", output:"_site", includes:"_includes", data:"_data" },
    templateFormats: ["njk","html","md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
