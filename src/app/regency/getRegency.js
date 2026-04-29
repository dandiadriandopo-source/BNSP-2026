const axios = require("axios");
const fs = require("fs");

(async () => {
  try {
    // 1. ambil semua province
    const provinceRes = await axios.get(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
      {
        headers: { "User-Agent": "Mozilla/5.0" },
      },
    );

    const provinces = provinceRes.data;

    let allRegencies = [];

    // 2. loop tiap province
    for (const prov of provinces) {
      console.log(`⏳ Fetch ${prov.name} (${prov.id})...`);

      const res = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
        },
      );

      const mapped = res.data.map((item) => ({
        nama: item.name,
        provinceId: Number(prov.id),
      }));

      allRegencies.push(...mapped);

      // optional delay biar aman
      await new Promise((r) => setTimeout(r, 100));
    }

    // 3. simpan file
    fs.writeFileSync("regencies.json", JSON.stringify(allRegencies, null, 2));

    console.log(`✅ DONE! Total data: ${allRegencies.length}`);
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  }
})();
