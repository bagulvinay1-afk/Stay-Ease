package com.stayease.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.stayease.entity.Role;
import com.stayease.repository.RoleRepository;

@Configuration
public class DataInitializer {
	@Bean
	CommandLineRunner initRole(RoleRepository roleRepo) {
		return args->{ 	
			if(roleRepo.findByName("ADMIN")==null) {
				roleRepo.save(new Role("ADMIN"));
				roleRepo.save(new Role("OWNER"));
				roleRepo.save(new Role("TENANT"));
				System.out.println("Roles Inserted....");
			}
		};
	}

}
