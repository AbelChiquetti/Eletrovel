#!/bin/bash

# Create directory if it doesn't exist
mkdir -p assets/marcas

# Download car brand logos
echo "Downloading car brand logos..."

# Popular car brands in Brazil
curl -o assets/marcas/fiat.png "https://www.freepnglogos.com/uploads/fiat-logo-png/fiat-logo-black-transparent-0.png"
curl -o assets/marcas/ford.png "https://www.freepnglogos.com/uploads/ford-logo-png/ford-logo-car-symbol-name-brand-emblem-0.png"
curl -o assets/marcas/chevrolet.png "https://www.freepnglogos.com/uploads/chevrolet-png-logo/chevrolet-car-png-logo-6.png"
curl -o assets/marcas/volkswagen.png "https://www.freepnglogos.com/uploads/vw-png-logo/volkswagen-black-logo-png-1.png"
curl -o assets/marcas/toyota.png "https://www.freepnglogos.com/uploads/toyota-logo-png/toyota-logos-brands-20.png"
curl -o assets/marcas/hyundai.png "https://www.freepnglogos.com/uploads/hyundai-png-logo/hyundai-logo-png-0.png"
curl -o assets/marcas/honda.png "https://www.freepnglogos.com/uploads/honda-logo-png/honda-logo-png-0.png"
curl -o assets/marcas/nissan.png "https://www.freepnglogos.com/uploads/nissan-logo-png/nissan-logo-png-0.png"
curl -o assets/marcas/renault.png "https://www.freepnglogos.com/uploads/renault-logo-png/renault-logo-png-0.png"
curl -o assets/marcas/jeep.png "https://www.freepnglogos.com/uploads/jeep-logo-png/jeep-car-logo-png-brand-image-0.png"
curl -o assets/marcas/mitsubishi.png "https://www.freepnglogos.com/uploads/mitsubishi-logo-png/mitsubishi-logo-png-0.png"
curl -o assets/marcas/bmw.png "https://www.freepnglogos.com/uploads/bmw-png-logo/bmw-png-logo-0.png"
curl -o assets/marcas/mercedes.png "https://www.freepnglogos.com/uploads/mercedes-logo-png/mercedes-logo-png-0.png"
curl -o assets/marcas/audi.png "https://www.freepnglogos.com/uploads/audi-logo-png/audi-logo-png-0.png"
curl -o assets/marcas/kia.png "https://www.freepnglogos.com/uploads/kia-logo-png/kia-logo-png-0.png"
curl -o assets/marcas/citroen.png "https://www.freepnglogos.com/uploads/citroen-logo-png/citroen-logo-png-0.png"
curl -o assets/marcas/peugeot.png "https://www.freepnglogos.com/uploads/peugeot-logo-png/peugeot-logo-png-0.png"
curl -o assets/marcas/subaru.png "https://www.freepnglogos.com/uploads/subaru-logo-png/subaru-logo-png-0.png"
curl -o assets/marcas/volvo.png "https://www.freepnglogos.com/uploads/volvo-logo-png/volvo-logo-png-0.png"
curl -o assets/marcas/land-rover.png "https://www.freepnglogos.com/uploads/land-rover-logo-png/land-rover-logo-png-0.png"

echo "Done downloading logos!" 