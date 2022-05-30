import { use } from 'chai';

use((await import('chai-as-promised')).default); // eslint-disable-line node/no-unsupported-features/es-syntax
use((await import('sinon-chai')).default); // eslint-disable-line node/no-unsupported-features/es-syntax
use((await import('dirty-chai')).default); // eslint-disable-line node/no-unsupported-features/es-syntax
