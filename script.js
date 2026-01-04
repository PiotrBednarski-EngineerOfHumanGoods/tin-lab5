// ==========================================
// ZADANIE 1 - SAMOCHODY
// ==========================================

// Klasa Auto z metodami do zarządzania cenami
class Auto {
    constructor(rok, przebieg, cena_wyjsciowa) {
        this.rok = rok;
        this.przebieg = przebieg;
        this.cena_wyjsciowa = cena_wyjsciowa;
        this.cena_koncowa = cena_wyjsciowa;
    }

    // a) Metoda powiększająca cenę wyjściową o 1000
    zwiekszCeneWyjsciowa() {
        this.cena_wyjsciowa += 1000;
        return this;
    }

    // b) Metoda obniżająca cenę końcową o 1000 za każdy rok wieku auta
    obnizCeneZaWiek() {
        const aktualnyRok = new Date().getFullYear();
        const wiekAuta = aktualnyRok - this.rok;
        this.cena_koncowa = this.cena_wyjsciowa - (wiekAuta * 1000);
        return this;
    }

    // c) Metoda obniżająca cenę końcową o 10000 za każde 100000km przebiegu
    obnizCeneZaPrzebieg() {
        const ileRazy100k = Math.floor(this.przebieg / 100000);
        this.cena_koncowa -= ileRazy100k * 10000;
        return this;
    }

    // d) Metoda dopisująca przebieg i rok, przeliczająca cenę automatycznie
    aktualizujDane(nowyPrzebieg, nowyRok) {
        this.przebieg = nowyPrzebieg;
        this.rok = nowyRok;
        // Przelicz cenę końcową
        this.cena_koncowa = this.cena_wyjsciowa;
        this.obnizCeneZaWiek();
        this.obnizCeneZaPrzebieg();
        return this;
    }

    // Metoda do wyświetlania informacji o aucie
    toString() {
        return `Auto: rok=${this.rok}, przebieg=${this.przebieg}km, cena_wyjsciowa=${this.cena_wyjsciowa}zł, cena_koncowa=${this.cena_koncowa}zł`;
    }
}

// Tablica samochodów
let tablicaSamochodow = [];

// e) Funkcja dopisująca auto do tablicy, jeśli cena > 10000
function dopiszDoTablicy(auto) {
    if (auto.cena_koncowa > 10000) {
        tablicaSamochodow.push(auto);
        return true;
    }
    return false;
}

// f) Funkcja zwiększająca rok o 1 dla wszystkich aut w tablicy
function zwiekszRok() {
    tablicaSamochodow.forEach(auto => {
        auto.rok += 1;
    });
}

// Test zadania 1
function testAuto() {
    const output = document.getElementById('output1');
    let result = '';

    result += '=== TEST ZADANIE 1 - SAMOCHODY ===\n\n';

    // Reset tablicy
    tablicaSamochodow = [];

    // Tworzenie aut
    let a1 = new Auto(2024, 100000, 9000);
    let a2 = new Auto(2024, 100000, 20000);

    result += '--- Utworzone auta ---\n';
    result += `Auto 1: ${a1.toString()}\n`;
    result += `Auto 2: ${a2.toString()}\n\n`;

    // Test metody zwiększania ceny wyjściowej
    result += '--- Test metody zwiekszCeneWyjsciowa() na Auto 2 ---\n';
    a2.zwiekszCeneWyjsciowa();
    result += `Po zwiększeniu: cena_wyjsciowa = ${a2.cena_wyjsciowa}zł\n\n`;

    // Reset dla testu głównego
    a2 = new Auto(2024, 100000, 20000);

    // Test dodawania do tablicy
    result += '--- Test dopiszDoTablicy() ---\n';
    const dodano1 = dopiszDoTablicy(a1);
    result += `Auto 1 (cena_koncowa=${a1.cena_koncowa}): ${dodano1 ? 'DODANO' : 'NIE DODANO (cena <= 10000)'}\n`;
    
    const dodano2 = dopiszDoTablicy(a2);
    result += `Auto 2 (cena_koncowa=${a2.cena_koncowa}): ${dodano2 ? 'DODANO' : 'NIE DODANO (cena <= 10000)'}\n\n`;

    result += '--- Tablica przed zwiekszRok() ---\n';
    result += `Liczba aut w tablicy: ${tablicaSamochodow.length}\n`;
    tablicaSamochodow.forEach((auto, i) => {
        result += `[${i}] rok: ${auto.rok}\n`;
    });

    // Zwiększenie roku
    zwiekszRok();

    result += '\n--- Tablica po zwiekszRok() ---\n';
    tablicaSamochodow.forEach((auto, i) => {
        result += `[${i}] rok: ${auto.rok}\n`;
    });

    result += '\n--- Wynik końcowy (console.log(tablica)) ---\n';
    result += JSON.stringify(tablicaSamochodow.map(a => ({
        rok: a.rok,
        przebieg: a.przebieg,
        cena_wyjsciowa: a.cena_wyjsciowa,
        cena_koncowa: a.cena_koncowa
    })), null, 2);

    output.textContent = result;
    console.log('=== ZADANIE 1 - SAMOCHODY ===');
    console.log(tablicaSamochodow);
}


// ==========================================
// ZADANIE 2 - STUDENCI
// ==========================================

// a) Klasa Ocena
class Ocena {
    constructor(przedmiot, wartosc) {
        this.przedmiot = przedmiot;
        this.wartosc = wartosc;
    }
}

// b) Klasa Student
class Student {
    constructor(imie, nazwisko) {
        this.imie = imie;
        this.nazwisko = nazwisko;
        this._oceny = []; // tablica ocen (prywatna konwencja z _)
        this.srednia = 0;
    }

    // Metoda hello
    hello() {
        return `Witaj ${this.imie} ${this.nazwisko}, Twoja średnia ocen to: ${this.srednia}.`;
    }

    // c) Setter oceny - dodaje ocenę i przelicza średnią
    set oceny(x) {
        if (x instanceof Ocena) {
            this._oceny.push(x);
            this._przeliczSrednia();
        }
    }

    // d) Getter oceny - zwraca oceny w formacie tekstowym
    get oceny() {
        if (this._oceny.length === 0) {
            return 'Brak ocen.';
        }
        return this._oceny.map(o => 
            `Przedmiot: ${o.przedmiot} - ocena ${o.wartosc}`
        ).join('. ') + '.';
    }

    // Metoda pomocnicza do przeliczania średniej
    _przeliczSrednia() {
        if (this._oceny.length === 0) {
            this.srednia = 0;
            return;
        }
        const suma = this._oceny.reduce((acc, o) => acc + o.wartosc, 0);
        this.srednia = Math.round((suma / this._oceny.length) * 100) / 100;
    }

    // Getter do pobrania tablicy ocen (dla Lab 6)
    get tablicaOcen() {
        return this._oceny;
    }
}

// Test zadania 2
function testStudent() {
    const output = document.getElementById('output2');
    let result = '';

    result += '=== TEST ZADANIE 2 - STUDENCI ===\n\n';

    // Tworzenie studenta
    let s = new Student('Jan', 'Kowalski');
    
    result += '--- Utworzenie studenta ---\n';
    result += `new Student('Jan', 'Kowalski')\n\n`;

    result += '--- Test metody hello() (bez ocen) ---\n';
    result += `s.hello() => "${s.hello()}"\n\n`;

    // Dodawanie ocen przez setter
    result += '--- Dodawanie ocen przez setter ---\n';
    s.oceny = new Ocena('WPR', 4);
    result += `s.oceny = new Ocena('WPR', 4)\n`;
    
    s.oceny = new Ocena('TIN', 3);
    result += `s.oceny = new Ocena('TIN', 3)\n`;
    
    s.oceny = new Ocena('POJ', 2);
    result += `s.oceny = new Ocena('POJ', 2)\n\n`;

    result += '--- Test metody hello() (z ocenami) ---\n';
    result += `s.hello() => "${s.hello()}"\n\n`;

    result += '--- Test gettera oceny ---\n';
    result += `s.oceny => "${s.oceny}"\n\n`;

    // Dodatkowy test - próba dodania nie-Oceny
    result += '--- Test dodania obiektu nie będącego Oceną ---\n';
    const liczbaPrzed = s.tablicaOcen.length;
    s.oceny = { przedmiot: 'TEST', wartosc: 5 }; // zwykły obiekt, nie Ocena
    const liczbapo = s.tablicaOcen.length;
    result += `Liczba ocen przed: ${liczbaPrzed}, po: ${liczbapo}\n`;
    result += `(Zwykły obiekt nie został dodany, bo nie jest instancją Ocena)\n\n`;

    // Test z wieloma studentami
    result += '--- Test z wieloma studentami ---\n';
    let s2 = new Student('Anna', 'Nowak');
    s2.oceny = new Ocena('WPR', 5);
    s2.oceny = new Ocena('TIN', 5);
    s2.oceny = new Ocena('POJ', 5);
    
    result += `${s2.hello()}\n`;
    result += `Oceny: ${s2.oceny}\n`;

    output.textContent = result;
    console.log('=== ZADANIE 2 - STUDENCI ===');
    console.log(s);
    console.log(s2);
}

// Wyświetl informację w konsoli po załadowaniu
console.log('Lab 5 - JavaScript Programowanie Obiektowe');
console.log('Otwórz stronę index.html i kliknij przyciski, aby uruchomić testy.');
console.log('Możesz też wywołać funkcje testAuto() i testStudent() w konsoli.');
