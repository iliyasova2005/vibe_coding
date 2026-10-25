const readline = require('node:readline/promises')

function ticketPrice(category){
    switch (category) {
        case 1:
            return 300
        case 2:
            return 500
        case 3:
            return 900
        default:
            return 0    
    }
}

function maxTickets(budget, price){
    let tickets = 0
    let sum = 0
    while (sum+price <= budget){
        sum+=price
        tickets++        
    }
    return tickets
}

function printTicketResult(category, budget) {
    const price = ticketPrice(category)
    if (price!=0) {
        const count = maxTickets(budget, price)
        console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`)
    } else {
        console.log('неизвестная категория')
    }
}

function deliveryPrice(distance, total){
    if (total >= 3000 || distance <= 3) {
        return 0
    } else if (distance >= 4 && distance <= 10) {
        return 200
    } else{
        let price = 200
        for (let i = 11; i<=distance; i++) {
            price += 25
        }
        return price
    }
}

function printDelivery(distance, total){
    let result = deliveryPrice(distance, total)
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${result} руб.`)
}

function printSteps(height){
    let built = 0
    for (let i = 1; i<=height; i++){
        if (i===4){
            continue
        }
        console.log(`Ступень ${i}`)
        built++
        if (i===10){
        console.log('Дальше лестница не построена')
        break   
    }
    }
    console.log(`Всего построено: ${built}`) 
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  console.log('Выберите задачу:')
  console.log('1 – билетная касса')
  console.log('2 – доставка заказа')
  console.log('3 – лестница')

  const action = Number(await rl.question('Ваш выбор: '))

  switch (action) {
    case 1: {
      const category = Number(await rl.question('Категория билета: '))
      const budget = Number(await rl.question('Бюджет: '))
      if (category<0 || budget <0){
        console.log('Некоррктные данные')
      } else {
        printTicketResult(category, budget)
      }    
      break
    }
    case 2: {
      const distance = Number(await rl.question('Расстояние: '))
      const total = Number(await rl.question('Сумма заказа: '))
      if (distance<0 || total <0){
        console.log('Некоррктные данные')
      } else {
        printDelivery(distance, total)
      }
      
      break
    }
    case 3: {
        const height = Number(await rl.question('Высота лестницы: '))
        if (distance<0 || total <0){
        console.log('Некоррктные данные')
      } else {
        printSteps(height)
      }
        break
    }
    default:
      console.log('такой задачи нет')
  }

  rl.close()
}

main()