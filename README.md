# Testowanie i jakość oprogramowania
## Paweł Hajdo

### Implementacja i testy gry Saper

Gra **Saper** to klasyczna gra logiczna, w której celem jest odkrycie wszystkich pól na planszy, które nie zawierają min. Gra kończy się, gdy gracz kliknie na pole zawierające minę, lub odkryje wszystkie bezpieczne pola.

---

### Scenariusze testowe

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
