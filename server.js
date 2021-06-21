const repeats = ['daily','weekly', 'monthly']
const terms = [
  ['Assentimento Prévio', 'Mineração', 'Amazônia'],
  ['Quilombo', 'Patrimônio Genético', 'Fronteira'],
  ['Quilombola', 'Índio', 'Covid-19'],
  ['Exército', 'Militar', 'Força Aérea'],
  ['CNAL', 'Saúde Publica', 'Armamento'],
]
module.exports = () => {
  const data = {
    schedules: []
  }
  for (let i = 1; i < 100; i++) {
    data.schedules.push({
      id: i,
      title:`Titulo - ${i}`,
      repeat: repeats[Math.floor(Math.random() * 3)],
      terms: terms[Math.floor(Math.random() * 4)],
      active: false
    })
  }
  return data
}