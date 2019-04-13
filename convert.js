let YAML = require('yaml')
let fs = require('fs')
let json2csv = require('json2csv')

let dataYAML = fs.readFileSync('./hackathon2019.yaml', 'utf8')
let data = YAML.parse(dataYAML, { prettyErrors: true })

let parser = new json2csv.Parser({
  fields: [
    'iban',
    'currency',
    'countryCode',
    'accounttype',
    'Identification',
    'name',
    'balance',
    'cdtDbtInd',
    'balancetype',
    'status',
  ],
})
let csv = parser.parse(data.users[0].accounts)

fs.writeFileSync('accounts.csv', csv, 'utf8')

data.users[0].accounts.forEach(account => {
  account.transactions.forEach(t => {
    t.iban = account.iban
  })

  parser = new json2csv.Parser({
    fields: [
      'iban',
      'amount',
      'currency',
      'cdtDbtInd',
      'status',
      'bookingDate',
      'counterparty',
      'code',
      'subcode',
      'balanceamount',
      'balancecurrency',
      'balancecdtDbtInd',
      'type',
    ],
  })
  csv = parser.parse(account.transactions)

  fs.writeFileSync('transactions.csv', csv, 'utf8')
})
