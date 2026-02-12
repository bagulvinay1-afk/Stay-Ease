package com.stayease.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.stayease.dto.PgRequestDto;
import com.stayease.dto.RoomRequestDto;
import com.stayease.entity.Pg;
import com.stayease.entity.Room;
import com.stayease.repository.PgRepository;

@Service
public class PgService {

    private final PgRepository pgRepository;

    public PgService(PgRepository pgRepository) {
        this.pgRepository = pgRepository;
    }

    // ✅ ADD PG
    public Pg addPg(PgRequestDto dto) {

        Pg pg = new Pg();

        pg.setName(dto.getName());
        pg.setAddress(dto.getAddress());
        pg.setCity(dto.getCity());
        pg.setDeposit(dto.getDeposit());
        pg.setPgType(dto.getPgType());
        pg.setFood(dto.getFood());
        pg.setAmenities(dto.getAmenities());
        pg.setRules(dto.getRules());
        pg.setContact(dto.getContact());

        // ✅ Rooms mapping
        List<Room> rooms = new ArrayList<>();

        if (dto.getRooms() != null) {
            for (RoomRequestDto r : dto.getRooms()) {

                Room room = new Room();
                room.setRoomNumber(r.getRoomNumber());
                room.setSharing(r.getSharing());
                room.setRent(r.getRent());
                room.setTotalBeds(r.getTotalBeds());
                room.setAvailableBeds(r.getAvailableBeds());

                room.setPg(pg); // 🔥 very important
                rooms.add(room);
            }
        }

        pg.setRooms(rooms);

        return pgRepository.save(pg);
    }

    // ✅ GET ALL PGs
    public List<Pg> getAll() {
        return pgRepository.findAll();
    }

    // ✅ GET PG BY ID
    public Pg getPgById(Long id) {
        return pgRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PG not found with id " + id));
    }

    // ✅ UPDATE PG (NOT ROOMS)
    public Pg updatePg(Long id, PgRequestDto dto) {

        Pg pg = pgRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PG not found with id " + id));

        pg.setName(dto.getName());
        pg.setAddress(dto.getAddress());
        pg.setCity(dto.getCity());
        pg.setDeposit(dto.getDeposit());
        pg.setPgType(dto.getPgType());
        pg.setFood(dto.getFood());
        pg.setAmenities(dto.getAmenities());
        pg.setRules(dto.getRules());
        pg.setContact(dto.getContact());

        // ❗ rooms should be handled separately
        return pgRepository.save(pg);
    }

    // ✅ DELETE PG (Rooms auto deleted via cascade)
    public void deletePg(Long pgId) {

        Pg pg = pgRepository.findById(pgId)
                .orElseThrow(() -> new RuntimeException("PG not found with id " + pgId));

        pgRepository.delete(pg);
    }
}
