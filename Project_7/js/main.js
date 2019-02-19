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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
// класс Директор
class Director {
	constructor() {
		this.projectsWeb = []; // мобильные проекты
		this.projectsMobile = []; // веб проекты
		this.projectsTest = []; // проекты для теста

		this.webDevelopers = 0; // веб разработчики
		this.mobileDevelopers = 0; // мобильные разработчики
		this.testExperts = 0; // тестировщики

		this.hiredEmployees = 0; // нанятые сотрудники
		this.firedEmployees = 0; // уволенные сотрудники
		this.freeEmployees = 0; // не занятые сотрудники

		this.projectGenerator = new ProjectsGenerator(); // запускаем генератор проектов

		self = this; // для доступа к методам внутри класса
	}

	work(day) {
		this.lastDay = day; // сколько дней работает фирма
		this.day = 1;
	}

	// метод добавляющий новые проекты (имя проекта, сложность проекта)
	addProject() {
		let currentType, currentDifficulty, currentName = 0;
		
		// генерируем проекты
		while(this.day <= this.lastDay) {
			this.projectGenerator.generateNumber();
			
			for (let i = 1; i <= this.projectGenerator.numberProjects; i++) {
				currentName++;
				currentType = this.projectGenerator.generateType();
				currentDifficulty = this.projectGenerator.generateDifficulty();

				// распределяем проекты по отделам
				if (currentType == "web") {
					self.addProjectWeb(currentName, currentType, currentDifficulty);
				} else {
					self.addProjectMobile(currentName, currentType, currentDifficulty);
				}
			}
			this.day++;
			console.log("Количество проектов за день:");
			console.log(this.projectGenerator.numberProjects);
		}
		console.log("Веб проекты.");
		console.log(self.projectsWeb);
		console.log("Мобильные проекты.");
		console.log(self.projectsMobile);
	}

	// проекты в веб отдел
	addProjectWeb(projectName, projectType, projectDifficulty) {
		this.projectName = projectName;
		this.projectType = projectType;
		this.projectDifficulty = projectDifficulty;
		this.projectsWeb.push([this.projectName, this.projectType, this.projectDifficulty]);
	}

	// проекты в мобильный отдел
	addProjectMobile(projectName, projectType, projectDifficulty) {
		this.projectName = projectName;
		this.projectType = projectType;
		this.projectDifficulty = projectDifficulty;
		this.projectsMobile.push([this.projectName, this.projectType, this.projectDifficulty]);
	}

	// получить массив с веб проектами
	getProjectsWeb() {
		return this.projectsWeb;
	}

	// получить массив с мобильными проектами
	getProjectsMobile() {
		return this.projectsMobile;
	}
}

// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
// класс Веб Отдел
class WebDepartment {
	constructor() {
		this.projectsWeb = [];
		this.completedProjects = [];
		this.freeEmployees = [];
		this.counterHiredEmployees = 0; // счетчки нанятых сотрудников
		this.counterFiredEmployees = 0; // счетчки уволенных сотрудников
	}

	takeData(directorObject) {
		this.directorObject = directorObject;
		this.projectsWeb = directorObject.projectsWeb;
	}

	getData() {
		return this.projectsWeb;
	}
}

// класс мобильный Отдел
class MobileDepartment {
	constructor() {
		this.projectsMobile = [];
		this.completedProjects = [];
		this.freeEmployees = [];
		this.counterHiredEmployees = 0; // счетчки нанятых сотрудников
		this.counterFiredEmployees = 0; // счетчки уволенных сотрудников
	}

	takeData(directorObject) {
		this.directorObject = directorObject;
		this.projectsMobile = directorObject.projectsMobile;
	}

	getData() {
		return this.projectsMobile;
	}
}

// класс Отдел Тестирования
class TestDepartment {
	constructor() {
		this.projectsTest = [];
		this.completedProjects = [];
		this.freeEmployees = [];
		this.counterHiredEmployees = 0; // счетчки нанятых сотрудников
		this.counterFiredEmployees = 0; // счетчки уволенных сотрудников
	}

	takeData(directorObject) {
		this.directorObject = directorObject;
	}

	getData() {
		return this.projectsTest;
	}

}

// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
// класс Веб разработчик
class WebDeveloper {
	constructor() {
		// [Работник, Счетчики]
		this.webDevelopers = []; // веб разработчики
		
		this.counterProjects = 0; // счетчик выполненных проектов
		this.counterDayOff = 0; // счетчик дней без работы
	}

	// считаем выполненные проекты
	countProjects() {
		this.counterProjects++;
		return this;
	}

	// считаем дни без работы
	countDayOff() {
		this.counterDayOff++;
		return this;
	}
}

// класс Веб разработчик
class MobileDeveloper {
	constructor() {
		// [Работник, Счетчики]
		this.mobileDevelopers = []; // мобильные разработчики
		
		this.counterProjects = 0; // счетчик выполненных проектов
		this.counterDayOff = 0; // счетчик дней без работы
	}

	// считаем выполненные проекты
	countProjects() {
		this.counterProjects++;
		return this;
	}

	// считаем дни без работы
	countDayOff() {
		this.counterDayOff++;
		return this;
	}
}

// класс Веб разработчик
class TestExpert {
	constructor() {
		// [Работник, Счетчики]
		this.testExperts = []; // тестировщики

		this.counterProjects = 0; // счетчик выполненных проектов
		this.counterDayOff = 0; // счетчик дней без работы
	}

	// считаем выполненные проекты
	countProjects() {
		this.counterProjects++;
		return this;
	}

	// считаем дни без работы
	countDayOff() {
		this.counterDayOff++;
		return this;
	}
}

// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
// класс веб проект
class WebProject {
	constructor() {
	// [Проект, Работник]
	}

	// назначить сотрудника
	appointEmployee(employee) {
		this.employee = employee;
		return this;
	}

	
}

// класс веб проект
class MobileProject {
	constructor() {
	// [Проект, Работник]
	}

	// назначить сотрудника
	appointEmployee(employee) {
		this.employee = employee;
		return this;
	}
}


// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
// класс Статистика (для вывода результатов, итоговое решение)
class Statistic {
	constructor() {

	}

	takeData(directorObject, webDepartmentObject, mobileDepartmentObject, 
		testDepartmentObject) {
		this.directorObject = directorObject;
		this.webDepartmentObject = webDepartmentObject;
		this.mobileDepartmentObject = mobileDepartmentObject;
		this.testDepartmentObject = testDepartmentObject;
	}

	addStatistic() {
		
	}
}


// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
// класс Генератор Проектов
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

// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
function launch() {
	const director = new Director(),
	webDepartment = new WebDepartment(),
	mobileDepartment = new MobileDepartment(),
	testDepartment = new TestDepartment(),
	statistic = new Statistic();
	
	director.work(2); // фирма работает 2 дня!!!
	director.addProject();

	webDepartment.takeData(director);
	mobileDepartment.takeData(director);
	testDepartment.takeData(director);
	statistic.takeData(director, webDepartment, mobileDepartment, testDepartment);

	console.log("");
	console.log("Веб проекты из Веб отдела:");
	console.log(webDepartment.getData());
	console.log("Мобильные проекты из Мобильного отдела:");
	console.log(mobileDepartment.getData());

	
}

launch();