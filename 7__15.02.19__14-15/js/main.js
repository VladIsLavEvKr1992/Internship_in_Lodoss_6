/*
Задача 2 Движение товара
<2d
Существует товар, производитель товара, потребитель товара, 
и посредник между производителем и потребителем. 
Ежедневно производитель создает произвольное количество единиц 
товара в интервале 50-150шт. Ежедневно у потребителя возникает 
необходимость в 70-120шт товара. Посредник за один день может 
доставить максимум 100шт товара. 
Смоделировать движение товара за 10 дней и вывести в табличной 
форме результаты. 

Колонки таблицы:
	Количество товара у производителя
	Количество необходимого потребителю товара
	Количество доставленного товара за день
	Количество произведенного товара за последние 3 дня
	Количество доставленного товара за последние 3 дня
	КПД посредника
Любой объект в этом задании должен быть экземпляром класса. Чтение и модификация свойств объектов извне должны быть реализованы через методы.

// класс производитель, производит товар сегодня и всегда
class Manufacturer {
	constructor() {
		this.minimum = 50;
		this.maximum = 150;
		this.goods = []; // массив с произведенными товарами
	}

	// счетчик произведенных за 3 дня товаров через метод slice() для отчета
	setCountThreeDay(day) {
		this.goodsThreeDay = this.goods.slice(day - 3, day);

		this.summThreeDay = this.goodsThreeDay.reduce(function(sum, current) {
			return sum + current;
		}, 0); // 0 - initialValue - это изначальное значение

		return this.summThreeDay;
	}

	setProducedToday(value) {
		this.goods.push(value);
	}

	// последний элемент массива с товарами
	getProducedToday() {
		return this.goods[this.goods.length - 1];
	}

	getProducedTotal() {
		return this.goods;
	}

	// сумма произведенных товаров
	getAllProduced() {
		this.summProduced = this.goods.reduce(function(sum, current) {
			return sum + current;
		}, 0);
		return this.summProduced;
	}
}

// класс потребитель, ему нужен товар сегодня и вообще
class Consumer {
	constructor() {
		this.minimum = 70;
		this.maximum = 120;
		this.goods = []; // массив с потребностью в товарах
	}

	setNeededToday(value) {
		this.goods.push(value);
	}
	
	// последний элемент массива
	getNeededToday() {
		return this.goods[this.goods.length - 1];
	}

	getNeededTotal() {
		return this.goods;
	}

	// сумма потребностей в товарах
	getAllNeeded() {
		this.summNeeded = this.goods.reduce(function(sum, current) {
			return sum + current;
		}, 0); // 0 - initialValue - это изначальное значение
		return this.summNeeded;
	}
}

//самый сложный класс посредник
class Middleman {
	constructor() {
		this.DELIVERY = 100;
		this.deliverArray = [];
	}

	takeData(manufacturerObject, consumerObject) {
		this.manufacturerObject = manufacturerObject;
		this.consumerObject = consumerObject;
	}

	// заполняю массив доставки товаров
	setDeliverToday() {
		var deliverToday = this.consumerObject.getNeededToday();

		if (deliverToday >= this.manufacturerObject.getProducedToday()) {
			deliverToday = this.manufacturerObject.getProducedToday();
		}

		if (deliverToday > this.DELIVERY) {
			deliverToday = this.DELIVERY;
		}

		this.deliverArray.push(deliverToday);
	}

	setEfficiency(day) {
		var efficiency,
		deliverTotal = 0;

		// доставка по дням
		for (let i = 0; i < day; i++) {
			deliverTotal += this.deliverArray[i];
		}

		// кпд
		efficiency = deliverTotal / (day * this.DELIVERY) * 100;
		return efficiency;
	}

	// счетчик доставленных за 3 дня товаров через метод slice() для отчета
	setCountThreeDay(day) {
		this.goodsThreeDay = this.deliverArray.slice(day - 3, day);

		this.summThreeDay = this.goodsThreeDay.reduce(function(sum, current) {
			return sum + current;
		}, 0); // 0 - initialValue - это изначальное значение

		return this.summThreeDay;
	}

	getDeliverToday() {
		return this.deliverArray[this.deliverArray.length - 1];
	}

	getDeliverTotal() {
		return this.deliverArray;
	}

	getEfficiency() {
		return summEfficiency;
	}
}


class Report {
	constructor() {

	}

	setReport(manufacturerObject, consumerObject, middlemanObject) {
		this.manufacturerObject = manufacturerObject;
		this.consumerObject = consumerObject;
		this.middlemanObject = middlemanObject;
	}

	getReport() {
		this.allProduced = this.manufacturerObject.getAllProduced();
		this.allNeeded = this.consumerObject.getAllNeeded();
		this.lastDeliver = this.middlemanObject.getDeliverToday();
		this.threeDayProduced = this.manufacturerObject.setCountThreeDay(3);
		this.threeDayDelivered = this.middlemanObject.setCountThreeDay(3);
		this.efficiencyMiddleman = this.middlemanObject.setEfficiency(10);
	}

	showResult() {
		// Количество товара у производителя:
		$('.all-produced').text(this.allProduced);

		// Количество необходимого потребителю товара:
		$('.all-needed').text(this.allNeeded);

		// Количество доставленного товара за последний день:
		$('.last-deliver').text(this.lastDeliver);

		// Количество произведенного товара за последние 3 дня:
		$('.three-produced').text(this.threeDayProduced);

		// Количество доставленного товара за последние 3 дня:
		$('.three-delivered').text(this.threeDayDelivered);

		// КПД посредника:
		$('.efficiency-middleman').text(this.efficiencyMiddleman);
	}
}

// генерирует случайные числа
function getRandom(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min));
};

// получаем данные о товарах и записываем их в экземпляры объектов
function setData() {
	var manufacturer = new Manufacturer(),
	consumer = new Consumer(),
	middleman = new Middleman(),
	report = new Report();

	middleman.takeData(manufacturer, consumer);
	report.setReport(manufacturer, consumer, middleman);

	for (let day = 1; day <= 10; day++) {
		// нижняя и верхняя граница производителя, должны быть свойствами производителя, может аргументами
		manufacturer.setProducedToday(getRandom(manufacturer.minimum, manufacturer.maximum));
		consumer.setNeededToday(getRandom(consumer.minimum, consumer.maximum));
		middleman.setDeliverToday(); // посредник получает товары от производителя
	}

	// формирует отчет
	report.getReport()
	// метод выводит на экран результаты
	report.showResult();

	// просто для контроля корректности работы программы!!!
	console.log("Произведено товаров за 10 дней:");
	console.log(manufacturer.getProducedTotal());
	console.log("Сумма товаров за последние 3 дня:");
	console.log(manufacturer.setCountThreeDay(3));
	console.log("Произведено за 3 дня:");
	console.log(manufacturer.goodsThreeDay); // просто получил значение из объекта

	console.log("Потребность в товарах за 10 дней:");
	console.log(consumer.getNeededTotal());
	
	console.log("Сумма доставленных товаров за последние 3 дня:");
	console.log(middleman.setCountThreeDay(3));
	console.log("Доставлено за 3 дня:");
	console.log(middleman.goodsThreeDay);
	console.log("Объект Посредник:");
	console.log(middleman);

	console.log("КПД Посредника:");
	console.log(middleman.setEfficiency(10));
	
	console.log("Класс Отчет:");
	console.log(report);
}
*/

// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// !!!ЗАДАЧА ПРО ФИРМУ!!!

/*
В фирме есть директор, который отвечает за набор сотрудников и получение новых проектов.
В фирме также есть 3 отдела: веб отдел, мобильный отдел и отдел тестирования в которых 
могут работать только соответственно веб разработчики, мобильные разработчики и QA 
специалисты. Каждый день директор может получить от нуля до 4 новых проектов одного из 
2 типов (Веб/мобильный), каждый из которых может быть трех уровней сложности.

Полученные проекты директор пытается передать в отделы учитывая их специализацию. 
В случае если в отделе недостаточно работников, то отдел принимает только проекты на 
реализацию которых есть ресурсы, а оставшиеся проекты остаются у директора на 
следующий день.

На следующий день директор нанимает необходимое количество программистов для реализации 
вчерашних проектов и передает их по отделам. В случае если в отделе, в момент получения 
проектов от директора есть свободные программисты, то веб программисты получают по 1 
проекту на реализацию, а мобильные могут работать на 1 проекте вдвоем или втроем если 
сложность проекта 2 или 3 соответственно. В зависимости от сложности на реализацию 
нужно 1,2 или 3 дня для 1 разработчика, после чего проект должен перейти в отдел 
тестирования.

QA специалист тратит на тестирование проекта любой сложности 1 день. После тестирования 
проект считается успешно реализованным и удаляется из системы. Программиста увольняют, 
если он более 3 дней подряд не занимался проектом.В случае если таких несколько, то 
каждый день из них увольняется только самый неопытный (участвовавший в наименьшем числе 
проектов).

На вход подается количество дней. На выходе подробная статистика: Количество 
реализованных проектов, нанятых и уволенных программистов. Начальные условия: в фирме 
нет проектов и нет программистов.
*/

// объект Статистика (для вывода результатов, итоговое решение)
class Statistic {
	constructor() {

	}

	addStatistic(day) {
		var projects = 0,
		programmers = 0;

		this.completedProjects = 0; // завершенные проекты
		this.hiredProgrammers = 0; // нанятые программисты
		this.firedProgrammers = 0; // уволенные программисты
	}

	getStatistic() {
		return;
	}
}


// объект Директор
class Director {
	constructor() {
		this.projectsArray = []; // массив содеражщий в себе проекты
	}

	// метода принимающий на работу сотрудников
	takeEmployee() {

	}

	// метода принимающий проект для выполнения
	takeProject() {

	}
}


// объект Веб Отдел
class WebDepartment {
	constructor() {
		this.webDevelopers = 0;
		this.projectsArray = []; // массив содеражщий в себе проекты
	}
}


// объект мобильный Отдел
class MobileDepartment {
	constructor() {
		this.mobileDevelopers = 0;
		this.projectsArray = []; // массив содеражщий в себе проекты
	}
}


// объект Отдел Тестирования
class TestDepartment {
	constructor() {
		this.testExperts = 0;
		this.projectsArray = []; // массив содеражщий в себе проекты
	}
}


// объект Проект (думаю, что проект за один день, на будущее)
class Project {
	constructor() {
		this.projectsArray = []; // массив содеражщий в себе проекты
	}

	// метод добавляющий новые проекты (имя проекта, сложность проекта)
	addProject(projectName, projectType, projectDifficulty) {
		this.projectName = projectName;
		this.projectType = projectType;
		this.projectDifficulty = projectDifficulty;
		this.projectsArray.push([this.projectName, this.projectType, this.projectDifficulty]);
	}

	getProject() {
		return this.projectsArray[this.projectsArray.length - 1];
	}

	getProjectsArray() {
		return this.projectsArray;
	}
}


// объект Генератор Проектов
class ProjectsGenerator {
	constructor() {
		this.numberProjects = 0;
		this.projectType = undefined;
		this.projectDifficulty = undefined;
	}

	// генерируем количество проектов
	generateNumber() {
		const numberMIN = 0, numberMAX = 4;
		this.numberProjects = Math.floor(numberMIN + Math.random() * (numberMAX + 1 - numberMIN));
		return this.numberProjects;
	}

	// генерируем тип проекта
	generateType() {
		const typeMIN = 1, typeMAX = 2;
		let intermediateValue;
		// генерируем промежуточное значение
		intermediateValue = Math.floor(typeMIN + Math.random() * (typeMAX + 1 - typeMIN));
		if (intermediateValue == 1) {
			this.projectType = "mobile";
		}
		if (intermediateValue == 2) {
			this.projectType = "web";
		}
		return this.projectType;
	}

	// генерируем сложность проекта
	generateDifficulty() {
		const difficultyMIN = 1, difficultyMAX = 3;
		let intermediateValue;
		// генерируем промежуточное значение
		intermediateValue = Math.floor(difficultyMIN + Math.random() * (difficultyMAX + 1 - difficultyMIN));
		if (intermediateValue == 1) {
			this.projectDifficulty = "easy";
		}
		if (intermediateValue == 2) {
			this.projectDifficulty = "medium";
		}
		if (intermediateValue == 3) {
			this.projectDifficulty = "hard";
		}
		return this.projectDifficulty;
	}
}

// генерируем проекты и записываем их в массив с проетками в объект Проект
function generateProject() {
	const projectGenerator = new ProjectsGenerator(),
	project = new Project();

	let currentType, currentDifficulty;
	
	projectGenerator.generateNumber();
	
	for (let i = 1; i <= projectGenerator.numberProjects; i++) {
		currentType = projectGenerator.generateType();
		currentDifficulty = projectGenerator.generateDifficulty();
		project.addProject(i, currentType, currentDifficulty);
	}

	console.log(projectGenerator.numberProjects);
	console.log("Массив со сгенерированными проектами из объекта Проект:");
	console.log(project.getProjectsArray());
}

generateProject();