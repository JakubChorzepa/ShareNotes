import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Folder, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-blue-50 to-blue-200 text-gray-800">
      {/* Sekcja Główna */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-20 sm:px-12">
        <h1 className="text-7xl font-extrabold text-gray-900 drop-shadow-md">
          ShareNotes
        </h1>
        <p className="mt-6 max-w-3xl text-center text-lg text-gray-600">
          Dzielenie się wiedzą nigdy nie było prostsze. Współpracuj ze
          znajomymi, organizuj swoje materiały i miej pełną kontrolę nad
          bezpieczeństwem swoich danych.
        </p>
        <div className="mt-10 flex gap-6">
          <Button variant="default" size="lg" asChild>
            <a href="/sign-up">Zarejestruj się</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/sign-in">Zaloguj się</a>
          </Button>
        </div>
      </section>

      {/* Sekcja Funkcjonalności */}
      <section className="bg-white px-6 py-20 sm:px-12">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-4xl font-extrabold text-gray-900">
            Dlaczego ShareNotes?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="bg-white bg-opacity-60 shadow-md backdrop-blur-md">
              <CardContent>
                <div className="mb-4 mt-4 flex justify-center text-blue-500">
                  <Folder size={40} />
                </div>
                <CardTitle>Udostępnianie plików</CardTitle>
                <CardDescription className="mt-4">
                  Przesyłaj notatki, współdziel je w grupach i korzystaj z
                  szyfrowanych linków.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-white bg-opacity-60 shadow-md backdrop-blur-md">
              <CardContent>
                <div className="mb-4 mt-4 flex justify-center text-green-500">
                  <Users size={40} />
                </div>
                <CardTitle>Organizacja danych</CardTitle>
                <CardDescription className="mt-4">
                  Porządkuj swoje pliki w folderach i udostępniaj wybrane
                  dokumenty znajomym.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-white bg-opacity-60 shadow-md backdrop-blur-md">
              <CardContent>
                <div className="mb-4 mt-4 flex justify-center text-yellow-500">
                  <ShieldCheck size={40} />
                </div>
                <CardTitle>Bezpieczeństwo</CardTitle>
                <CardDescription className="mt-4">
                  Twoje dane są szyfrowane, a dostęp do nich mają tylko wybrane
                  osoby.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sekcja Opinie Użytkowników */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-20 sm:px-12">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-4xl font-extrabold text-gray-900">
            Co mówią nasi użytkownicy?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardContent>
                <Badge className="mb-4 mt-4 bg-blue-500 text-white">
                  ⭐⭐⭐⭐⭐
                </Badge>
                <p className="italic text-gray-600">
                  "Najlepsze narzędzie do pracy zespołowej. Intuicyjne i
                  bezpieczne."
                </p>
                <p className="mt-4 font-semibold text-blue-500">- Marta</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Badge className="mb-4 mt-4 bg-green-500 text-white">
                  ⭐⭐⭐⭐⭐
                </Badge>
                <p className="italic text-gray-600">
                  "Uwielbiam tworzyć foldery i udostępniać je swoim znajomym.
                  Rewelacja!"
                </p>
                <p className="mt-4 font-semibold text-green-500">- Piotr</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Badge className="mb-4 mt-4 bg-yellow-500 text-white">
                  ⭐⭐⭐⭐⭐
                </Badge>
                <p className="italic text-gray-600">
                  "Bezpieczeństwo na pierwszym miejscu. Jestem zachwycona!"
                </p>
                <p className="mt-4 font-semibold text-yellow-500">
                  - Katarzyna
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sekcja Team */}
      <section className="bg-gray-200 px-6 py-20 sm:px-12">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-4xl font-extrabold text-gray-900">
            Poznaj nasz zespół
          </h2>
          <div className="flex justify-center gap-8">
            {/* Osoba 1 */}
            <div className="flex flex-col items-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gray-300 text-xl font-semibold">
                <span>👨‍💻</span>
              </div>
              <p className="mt-4 text-xl font-bold">Janek</p>
              <p>Developer</p>
            </div>
            {/* Osoba 2 */}
            <div className="flex flex-col items-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gray-300 text-xl font-semibold">
                <span>🎨</span>
              </div>
              <p className="mt-4 text-xl font-bold">Anna</p>
              <p>Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja CTA */}
      <section className="bg-blue-500 py-20 text-center text-white">
        <h2 className="mb-4 text-4xl font-extrabold">Gotowy na więcej?</h2>
        <p className="mb-8 text-lg font-light">
          Dołącz już teraz i odkryj pełnię możliwości!
        </p>
        <Button variant="ghost" className="bg-white text-blue-500">
          Zarejestruj się za darmo
        </Button>
      </section>

      {/* Sekcja Kontakt */}
      <section className="bg-gray-100 px-6 py-20 sm:px-12">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-4xl font-extrabold text-gray-900">
            Skontaktuj się z nami
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            Masz pytania? Jesteśmy tutaj, aby pomóc. Wypełnij formularz poniżej,
            a skontaktujemy się z Tobą jak najszybciej.
          </p>

          <form
            action="#"
            method="POST"
            className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-left text-lg text-gray-700"
              >
                Imię i nazwisko
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Wpisz swoje imię i nazwisko"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-left text-lg text-gray-700"
              >
                Adres e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Wpisz swój adres e-mail"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-left text-lg text-gray-700"
              >
                Twoja wiadomość
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Wpisz swoją wiadomość"
              ></textarea>
            </div>

            <Button
              variant="default"
              size="lg"
              type="submit"
              className="mt-6 w-full"
            >
              Wyślij wiadomość
            </Button>
          </form>
        </div>
      </section>

      {/* Stopka */}
      <footer className="bg-gray-900 py-6 text-center text-gray-300">
        © {new Date().getFullYear()} ShareNotes. Wszystkie prawa zastrzeżone.
      </footer>
    </div>
  );
}
