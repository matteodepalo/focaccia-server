import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['./**/*.gql'],
  path: join(process.cwd(), '../focaccia-client/graphql.ts'),
  watch: true
});