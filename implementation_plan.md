# Ajustos de Tarifes, Accessoris de Clauers, MakerWorld i Perfil «Qui Sóc»

Actualització puntual de preus per a comandes de 100 unitats, incorporació del detall d'accessoris inclosos a cada clauer, ampliació de l'opció MakerWorld a qualsevol figura o model i renovació de la secció «Qui Sóc» amb l'enllaç directe al perfil de MakerWorld.

---

### Revisió de l'Usuari i Decisions Confirmades

> [!IMPORTANT]
> Aquest pla aplica tots els canvis demanats i les respostes confirmades a la fase de preguntes:

- **Enllaç de MakerWorld a «Clauers 3D»**: El botó de la targeta de MakerWorld obrirà la pàgina principal de MakerWorld (`makerworld.com/es`) perquè l'usuari pugui explorar tant clauers com figures o qualsevol altre model.
- **Ubicació dels accessoris inclosos**: La inclusió d'**anella, mosquetó i bosseta petita** es mostrarà dins la llista de punts clau de cada targeta de clauer.

---

### 1. Visió General dels Canvis

- **Tarifes Clubs (`100 clauers`)**:
  - S'actualitza el tram de 100 clauers de `3,85 €/unitat` a **`3,60 €/unitat`** (`360,00 €` per a 100 unitats), tant a la taula oficial com a la calculadora interactiva de pressupostos i al banner informatiu de la pàgina d'Inici.
- **Catàleg «Opcions de Clauers 3D»**:
  - Cada targeta de clauer incorpora dins la seva llista de punts la inclusió d'**anella, mosquetó i bosseta petita**.
  - L'opció de **MakerWorld** s'amplia perquè quedi clar que no es limita només a clauers, sinó que també permet escollir **figures o qualsevol altre model** disponible dins de MakerWorld, amb un botó directe a la pàgina principal i l'opció d'enviar l'enllaç per correu electrònic.
- **Secció «Qui Sóc»**:
  - S'afegeix una menció a la pàgina de MakerWorld del creador amb un botó destacat que porta directament al seu perfil (`https://makerworld.com/es/@Hablack09/upload`).
  - S'actualitza el comptador de **Peces impreses** a **`7`**.
  - S'elimina l'indicador d'«Impressora actua».

---

### 2. Experiència d'Usuari i Disseny Visual

- **Coherència visual a «Qui Sóc»**:
  - Es manté tota la història personal del creador i la galeria dels 7 models, ajustant els contenidors a l'estètica neta de la resta de la web (vores fines `1px`, fons neutres i tipografia consistent).
  - En eliminar l'indicador d'«Impressora actua», l'espai d'estadístiques i enllaç es reequilibra en dues columnes netes: una targeta amb la xifra tabular **`7` Peces impreses** i una targeta d'acció directa amb el botó cap al perfil de **MakerWorld**.
- **Claredat a la targeta de MakerWorld**:
  - S'actualitza la descripció i els punts clau perquè indiquin explícitament que es pot triar qualsevol figura, clauer o peça de MakerWorld, i en cas de ser un clauer també s'hi inclou anella, mosquetó i bosseta petita.
- **Precisió tabular a les tarifes**:
  - La calculadora interactiva recalcularà en temps real qualsevol comanda de `100` o més unitats a `3,60 €/unitat`.

---

### 3. Decisions Clau i Compromisos

- **Actualització global del preu mínim a l'aplicació**:
  - *Enfocament escollit*: Actualitzar tant la taula i calculadora de Tarifes Clubs com la menció de preu mínim a la pàgina d'Inici (`3,60 €/unitat`).
  - *Per què*: Evita qualsevol discrepància entre el missatge promocional de la portada i la tarifa real aplicada a la calculadora.
- **Enllaç extern segur als perfils de MakerWorld**:
  - *Enfocament escollit*: Utilitzar enllaços `<a href="..." target="_blank" rel="noopener noreferrer">` tant per al catàleg general de MakerWorld com per al perfil `@Hablack09`.
  - *Per què*: Permet consultar models en una pestanya nova sense perdre la sessió ni el context de la web principal.

---

### 4. Arquitectura i Fluxos Actualitzats

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Canvis per Secció                               │
├──────────────────────────┬──────────────────────┬───────────────────────┤
│       Tarifes Clubs      │      Clauers 3D      │        Qui Sóc        │
│                          │                      │                       │
│ · 100 clauers:           │ · Totes les targetes │ · Peces impreses: 7   │
│   3,60 €/unitat          │   inclouen anella,   │ · Eliminat:           │
│ · Calculadora i Inici    │   mosquetó i bosseta │   "Impressora actua"  │
│   sincronitzats a 3,60 € │ · MakerWorld ampliat │ · Nou botó directe al │
│                          │   a figures/models   │   perfil @Hablack09   │
│                          │   (makerworld.com/es)│   a MakerWorld        │
└──────────────────────────┴──────────────────────┴───────────────────────┘
```
