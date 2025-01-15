# Testowanie i jakość oprogramowania
## Paweł Hajdo

### Implementacja i testy gry Saper

Gra **Saper** to klasyczna gra logiczna, w której celem jest odkrycie wszystkich pól na planszy, które nie zawierają min. Gra kończy się, gdy gracz kliknie na pole zawierające minę, lub odkryje wszystkie bezpieczne pola.

---

### Uruchomienie projektu
```
> npm i
> npm run dev
```
Aplikacja będzie dostępna na porcie 3000

### Uruchomienie testów
```
> npm i
> npx jest
```
### Testy jednostkowe
1. Test tworzenia planszy z poprawną liczbą wierszy i kolumn - [/__tests__/createBoard.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/createBoard.test.ts)
2. Test tworzenia planszy z poprawną liczbą min - [/__tests__/createBoard.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/createBoard.test.ts)
3. Test tworzenia planszy ze sprawdzeniem czy 2 miny nie są w tym samym miejscu  - [/__tests__/createBoard.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/createBoard.test.ts)
4. Test funkcji formatującej czas - sprawdzenie czy poprawnie formatuje dla pełnych minut  - [/__tests__/formatTime.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/formatTime.test.ts)
5. Test funkcji formatującej czas - sprawdzenie czy poprawnie formatuje dla czasów poniżej minuty  - [/__tests__/formatTime.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/formatTime.test.ts)
6. Test funkcji formatującej czas - sprawdzenie czy poprawnie formatuje dla 0 sekund  - [/__tests__/formatTime.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/formatTime.test.ts)
7. Test funkcji formatującej czas - sprawdzenie czy poprawnie formatuje dla dużych wartości  - [/__tests__/formatTime.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/formatTime.test.ts)
8. Test funkcji formatującej czas - sprawdzenie czy poprawnie formatuje dla ujemnych wartości  - [/__tests__/formatTime.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/formatTime.test.ts)
9. Test funkcji formatującej czas - sprawdzenie czy poprawnie formatuje dla ułamkowych wartości  - [/__tests__/formatTime.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/formatTime.test.ts)
10. Test funkcji formatującej czas - sprawdzenie czy poprawnie formatuje dla wartości poniżej 1 sekundy  - [/__tests__/formatTime.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/formatTime.test.ts)
    
### Testy integracyjne
1. Test logowania - powinno zwrócić błąd 401 gdy błędny email - [/__tests__/api/login.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/api/login.test.ts)
2. Test logowania - powinno zwrócić błąd 401 gdy błęde hasło - [/__tests__/api/login.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/api/login.test.ts)
3. Test logowania - powinno zwrócić błąd 500 gdy error bazy danych - [/__tests__/api/login.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/api/login.test.ts)
4. Test rejestracji - powinno zarejestrować usera poprawnie - [/__tests__/api/register.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/api/register.test.ts)
5. Test rejestracji - powinno zwrócić błąd gdy email zajęty - [/__tests__/api/register.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/api/register.test.ts)
6. Test rejestracji - powinno zwrócić błąd 500 gdy error bazy danych - [/__tests__/api/register.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/api/register.test.ts)
7. Test endpointu results - powinno poprawnie dodać wynik gry do bazy - [/__tests__/api/results.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/api/results.test.ts)
8. Test endpointu results - powinno zwrócić błąd 400 gdy request body niepoprawny - [/__tests__/api/results.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/api/results.test.ts)
9. Test endpointu results - powinno zwrócić błąd 401 gdy nie ma tokena w zapytaniu - [/__tests__/api/results.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/api/results.test.ts)
10. Test endpointu results - powinno zwrócić błąd 500 gdy error bazy danych - [/__tests__/api/results.test.ts](https://github.com/pawel-hajdo/Minesweeper/blob/main/__tests__/api/results.test.ts)

### Dokumentacja API
- ```POST /api/login``` - logowanie do aplikacji
- ```POST /api/register``` - rejestracja do aplikacji
- ```POST /api/logout``` - wylogowanie z aplikacji
- ```GET /api/results``` - pobranie wyników gier
- ```POST /api/results``` - wysłanie wyniku gry
  
### Przypadki testowe dla testera manualnego

#### 1. **Testowanie rejestracji**
- **Warunki początkowe**: Aplikacja otwarta na podstronie /register.
- **Kroki**:
  1. Wypełnij pole username
  2. Wypełnij pole email
  3. Wypełnij pola password i confim password
- **Oczekiwany wynik**: Rejestracja przebiega pomyślnie, wyświetla się komunikat, a następnie następuje przekierowanie na ścieżkę /login

#### 2. **Testowanie logowania**
- **Warunki początkowe**: Aplikacja otwarta na podstronie /login.
- **Kroki**:
  1. Wypełnij pole email
  2. Wypełnij pola password
- **Oczekiwany wynik**: Logowanie przebiega pomyślnie, wyświetla się komunikat, a następnie następuje przekierowanie na stronę główną

#### 3. **Testowanie wyboru poziomu trudności**
- **Warunki początkowe**: Aplikacja otwarta na stronie głównej.
- **Kroki**:
  1. Wybierz poziom trudności z dostępnej listy (easy, medium, hard) klikając odpowiedni przycisk
- **Oczekiwany wynik**: Aktualnie wybrany przycisk zmienia kolor, plansza powiększa/zmniejsza się, ilość flag powiększa/zmniejsza sie.

#### 4. **Testowanie odkrywania pól**
- **Warunki początkowe**: Gra rozpoczęta, plansza jest widoczna.
- **Kroki**:
  1. Kliknij na pole, które nie zawiera miny.
  2. Obserwuj, czy odkryte pole ujawnia liczbę sąsiednich min lub jest puste (jeśli sąsiednich min nie ma).
  3. Powtórz kliknięcie na kilka innych pól.
- **Oczekiwany wynik**: Kliknięte pole zostaje poprawnie odkryte. Jeśli pole nie zawiera miny, odkrywają się także sąsiadujące puste pola.

#### 5. **Testowanie stawiania flag**
- **Warunki początkowe**: Gra rozpoczęta, plansza jest widoczna.
- **Kroki**:
  1. Kliknij prawym przyciskiem myszy na dowolne pole, aby postawić flagę.
  2. Obserwuj, czy flaga pojawia się na polu.
  3. Kliknij ponownie prawym przyciskiem myszy na to samo pole, aby usunąć flagę.
  4. Powtórz czynność na kilku innych polach.
- **Oczekiwany wynik**: Flagi są poprawnie stawiane i usuwane po kliknięciu prawym przyciskiem myszy. Liczba dostępnych flag zmienia się w zależności od aktualnej liczby postawionych flag.

#### 6. **Testowanie rozpoczynania gry od nowa**
- **Warunki początkowe**: Gra jest w toku, plansza jest widoczna.
- **Kroki**:
  1. Kliknij przycisk "Nowa gra".
  2. Obserwuj, czy plansza zostaje zresetowana.
  3. Zweryfikuj, czy licznik czasu i liczba pozostałych flag również zostały zresetowane.
- **Oczekiwany wynik**: Plansza jest zresetowana, licznik czasu i flag wracają do wartości początkowych, gra gotowa do rozpoczęcia od nowa.

#### 7. **Testowanie zakończenia gry przez odkrycie miny**
- **Warunki początkowe**: Gra rozpoczęta, plansza jest widoczna.
- **Kroki**:
  1. Kliknij na pole zawierające minę.
  2. Obserwuj, czy wszystkie miny na planszy zostają odkryte.
  3. Zweryfikuj, czy pojawia się komunikat o przegranej.
- **Oczekiwany wynik**: Po kliknięciu na pole z miną gra kończy się, wszystkie miny są odkryte, a gracz widzi komunikat o przegranej.

#### 8. **Testowanie zakończenia gry przez odkrycie wszystkich bezpiecznych pól**
- **Warunki początkowe**: Gra rozpoczęta, plansza jest widoczna.
- **Kroki**:
  1. Odkryj wszystkie pola, które nie zawierają min (możesz wykorzystać flagi, aby oznaczyć miny).
  2. Obserwuj, czy gra automatycznie kończy się po odkryciu ostatniego bezpiecznego pola.
  3. Zweryfikuj, czy pojawia się komunikat o wygranej.
- **Oczekiwany wynik**: Po odkryciu wszystkich bezpiecznych pól gra kończy się, a gracz widzi komunikat o wygranej.

#### 9. **Testowanie wyświetlania wyników dla wybranego poziomu trudności**
- **Warunki początkowe**: Aplikacja otwarta na podstronie /results. Ranking wyświetla się domyślnie dla poziomu "all".
- **Kroki**:
  1. Sprawdź, czy ranking wyświetla wyniki dla wszystkich poziomów trudności (domyślne ustawienie "all").
  2. Zmień poziom trudności w select z "all" na "easy".
  3. Zweryfikuj, czy ranking wyświetla tylko wyniki dla poziomu "easy".
  4. Powtórz dla poziomów "medium" i "hard".
- **Oczekiwany wynik**: Ranking poprawnie filtruje wyniki w zależności od wybranego poziomu trudności. Wyniki dla poziomów "easy", "medium" i "hard" odpowiadają rzeczywistym danym.

#### 10. **Testowanie funkcji wylogowania**
- **Warunki początkowe**: Użytkownik jest zalogowany i znajduje się na dowolnej podstronie aplikacji.
- **Kroki**:
  1. Kliknij na avatar użytkownika znajdujący się w menu górnym po prawej stronie.
  2. Obserwuj, czy pojawia się dropdown z opcją "Logout".
  3. Kliknij przycisk "Logout".
  4. Obserwuj, czy następuje przekierowanie na stronę logowania /login.
  5. Zweryfikuj, czy token sesji został usunięty poprzez sprawdzenie ciasteczek w przeglądarce.
  6. Spróbuj ponownie uzyskać dostęp do chronionych podstron (np. /results).
- **Oczekiwany wynik**: Użytkownik zostaje wylogowany, następuje przekierowanie na stronę logowania, token jest usunięty, a próba dostępu do chronionych podstron kończy się przekierowaniem na /login.

### Technologie
Technologie wykorzystane w projekcie to:
- Next.js (TypeScript)
- PostgreSQL
